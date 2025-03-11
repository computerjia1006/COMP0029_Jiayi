
import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Pagination from '@mui/material/Pagination';

interface Project {
  id: number;
  title: string;
  image: string | null;
  video: string | null;
  date: string;
  companyName: string;
  companySize: string;
  type: string;
  details: string;
  program: string;
  isFeatured: boolean;
}

const SearchProject = (): JSX.Element => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [projectType, setProjectType] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const projectsPerPage = 9;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let result = [...projects];
    
    // Apply search query filter
    if (searchQuery) {
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply project type filter
    if (projectType) {
      result = result.filter(project => project.type === projectType);
    }

    // Apply sorting
    if (sortBy) {
      switch (sortBy) {
        case 'A-Z':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'Z-A':
          result.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'size-asc':
          const sizeOrder = { '1,000-5,000': 1, '5,000-10,000': 2, '10,000+': 3 };
          result.sort((a, b) => sizeOrder[a.companySize] - sizeOrder[b.companySize]);
          break;
        case 'size-desc':
          const sizeOrderDesc = { '1,000-5,000': 1, '5,000-10,000': 2, '10,000+': 3 };
          result.sort((a, b) => sizeOrderDesc[b.companySize] - sizeOrderDesc[a.companySize]);
          break;
        case 'date-desc':
          result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          break;
        case 'date-asc':
          result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          break;
      }
    }

    setFilteredProjects(result);
  }, [projects, searchQuery, projectType, sortBy]);

  const paginatedProjects = filteredProjects.slice(
    (page - 1) * projectsPerPage,
    page * projectsPerPage
  );

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography fontWeight={700} variant={'h4'} align={'left'}>
          All Projects
        </Typography>
        <Typography
          align={'left'}
          color={'text.secondary'}
          variant={'subtitle2'}
          sx={{ textTransform: 'uppercase' }}
          fontWeight={600}
        >
          Projects done by students
        </Typography>
      </Box>
      <Grid
        container
        spacing={4}
        sx={{
          '.MuiOutlinedInput-root': {
            background: theme.palette.background.paper,
          },
        }}
      >
        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" sx={{ minWidth: 1 }}>
            <InputLabel></InputLabel>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Projects  "
              style={{
                width: '100%',
                padding: '16.5px 14px',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '4px',
                background: theme.palette.background.paper,
                fontSize: '1rem',
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" sx={{ minWidth: 1 }}>
            <InputLabel>Project Type</InputLabel>
            <Select 
              label="Project Type"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            >
              <MenuItem value="">
                <em>All types</em>
              </MenuItem>

              {[...new Set(projects.map(project => project.type))].sort().map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}


            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" sx={{ minWidth: 1 }}>
            <InputLabel>Sort By</InputLabel>
            <Select 
              label="Sort By"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="">
                <em>Default</em>
              </MenuItem>
              <MenuItem value={'A-Z'}>Project Title (A-Z)</MenuItem>
              <MenuItem value={'Z-A'}>Project Title (Z-A)</MenuItem>
              <MenuItem value={'date-desc'}>Date (Newest First)</MenuItem>
              <MenuItem value={'date-asc'}>Date (Oldest First)</MenuItem>
              <MenuItem value={'size-asc'}>Company Size (Small to Large)</MenuItem>
              <MenuItem value={'size-desc'}>Company Size (Large to Small)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box marginY={4}>
        <Grid container spacing={4}>
          {paginatedProjects.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                component={'a'}
                href={`/projects/${item.id}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardMedia
                  image={item.image || '/placeholder-project.jpg'}
                  sx={{
                    height: 240,
                  }}
                />
                <CardContent>
                  <Typography variant={'h6'} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant={'subtitle2'} color="textSecondary">
                    {item.companyName} ({item.companySize})
                  </Typography>
                  <Typography
                    variant={'subtitle2'}
                    color="primary"
                    sx={{ marginTop: 1 }}
                  >
                    {item.type}
                  </Typography>
                  {item.isFeatured && (
                    <Typography
                      variant={'subtitle2'}
                      color="secondary"
                      sx={{ marginTop: 1 }}
                    >
                      Featured Project
                    </Typography>
                  )}
                </CardContent>
                <Box flexGrow={1} />
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    size="large"
                    endIcon={
                      <svg
                        width={16}
                        height={16}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    }
                  >
                    Learn more
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" marginTop={4}>
          <Pagination 
            count={Math.ceil(filteredProjects.length / projectsPerPage)} 
            page={page}
            onChange={(_, value) => setPage(value)}
            size={'large'} 
            color="primary" 
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SearchProject;
