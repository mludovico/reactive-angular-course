import express from 'express';
import {courses, LESSONS} from "./data";

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res) => {
  console.log(req.method, req.url, req.body);
  req.next?.();
});

app.get('/api/courses', (req, res) => {
  setTimeout(
    function () {
      res.send({
        'payload': courses
      });
      console.log("finished delay on GET...");
    }, 1500);
  console.log("finished GET handler...");
});

app.put('/api/courses/:id', (req, res) => {
  const courseIndex = courses.findIndex(course => course.id === parseInt(req.params.id));
  if (courseIndex < 0) {
    return res.status(404).send({
      'message': 'Course not found'
    });
  }
  courses[courseIndex] = {
    ...courses[courseIndex],
    ...req.body
  };
  setTimeout(function () {
    res.send({
      'payload': courses[courseIndex]
    });
    console.log("finished delay on PUT...");
  }, 1500);
  console.log("finished delay on PUT...")
  console.log("finished PUT handler...")
});

app.post('/api/login', (req, res) => {
  const {
    email,
    password
  } = req.body;
  console.log(email, password);
  if (email === 'test@test.com' && password === 'test') {
    res.send({
      'message': 'Login successful'
    });
  } else {
    res.status(401).send({
      'message': 'Login failed'
    });

  }
});

app.get('/api/lessons/', (req, res) => {
  const queryParam = req.query as any;
  console.log(queryParam);
  const courseId = queryParam.courseId,
    filter = queryParam.filter || '',
    sortOrder = queryParam.sortOrder || 'asc',
    pageNumber = parseInt(queryParam.pageNumber) || 0,
    pageSize = parseInt(queryParam.pageSize) || 3;

  let lessons: any[];

  if (courseId) {
    lessons = Object.values(LESSONS).filter(lesson => lesson.courseId == courseId).sort((a, b) => sortOrder === 'asc' ? a.id - b.id : b.id - a.id);
  } else {
    lessons = Object.values(LESSONS)
  }

  if (filter) {
    lessons = lessons.filter(lesson => lesson.description.trim().toLowerCase().includes(filter.toLowerCase()));
  }

  if (sortOrder === 'desc') {
    lessons = lessons.reverse();
  }

  const initialIndex = pageNumber * pageSize;

  const lessonsPage = lessons.slice(initialIndex, initialIndex + pageSize);

  setTimeout(function () {
    res.send({
      'payload': lessonsPage,
      'total': lessons.length
    });
    console.log("finished delay on GET...");
  }, 3000);
});

app.get('/api/courses/:id', (req, res) => {
  setTimeout(function () {
    res.send(courses.find(course => course.id == parseInt(req.params.id)));
  }, 1500);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
