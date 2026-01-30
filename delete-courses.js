const fetch = require('node-fetch').default;

const strapiUrl = 'http://localhost:1337/api/courses';

async function deleteAllCourses() {
  try {
    const response = await fetch(strapiUrl);
    const data = await response.json();
    const courses = data.data;

    for (const course of courses) {
      const deleteResponse = await fetch(`${strapiUrl}/${course.documentId || course.id}`, {
        method: 'DELETE'
      });
      if (deleteResponse.ok) {
        console.log(`Deleted course: ${course.attributes?.moduleCode || course.moduleCode}`);
      } else {
        console.error(`Error deleting:`, await deleteResponse.text());
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log('All courses deleted.');
  } catch (error) {
    console.error('Error:', error);
  }
}

deleteAllCourses();