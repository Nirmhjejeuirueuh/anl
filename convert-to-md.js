const fetch = require('node-fetch').default;
const TurndownService = require('turndown');

const strapiUrl = 'http://localhost:1337/api/courses';

const turndownService = new TurndownService();

async function convertCoursesToMarkdown() {
  try {
    // Fetch all courses
    const response = await fetch(strapiUrl);
    const data = await response.json();
    const courses = data.data;

    for (const course of courses) {
      const updatedData = {};

      if (course.synopsis) {
        updatedData.synopsis = turndownService.turndown(course.synopsis);
      }
      if (course.learningObjectives) {
        updatedData.learningObjectives = turndownService.turndown(course.learningObjectives);
      }
      if (course.targetAudience) {
        updatedData.targetAudience = turndownService.turndown(course.targetAudience);
      }

      if (Object.keys(updatedData).length > 0) {
        const updateResponse = await fetch(`${strapiUrl}/${course.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: updatedData })
        });

        if (updateResponse.ok) {
          console.log(`Updated course: ${course.moduleCode}`);
        } else {
          console.error(`Error updating ${course.moduleCode}:`, await updateResponse.text());
        }
      }

      // Delay
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

convertCoursesToMarkdown();