const fs = require('fs');
const path = require('path');
const axios = require('axios');

const courseDataDir = path.join(__dirname, '..', 'course_data');
const strapiUrl = 'https://clever-example-420715eeee.strapiapp.com/api/courses';
const apiToken = '0ec5c0857e2d2da7b136a294a8d5ef819130214fbb362f26cd5fd9f4a868c60e25599130425d22af3d071d0c0bc315150507bc0033c72ef5a11d709e5ae44f6925935407b069a39444c5c84dafdd22a2262963b2007aa787a3032ca8bd99c75819ad47b44c51690993e1b97cd7862ce1cdabd5da410687f3aedfb923f9abe098';

async function parseCourseFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let course = {
    title: '',
    moduleCode: '',
    synopsis: '',
    learningObjectives: '',
    targetAudience: '',
    trainingDays: 0,
    hyperlink: '',
    courseFamily: '',
    favorite: false,
    status: 'enable'
  };

  let section = '';
  for (let line of lines) {
    line = line.trim();
    if (line.startsWith('COURSE:')) {
      course.title = line.replace('COURSE: ', '');
    } else if (line.startsWith('CODE:')) {
      course.moduleCode = line.replace('CODE: ', '');
    } else if (line === 'MODULE INFORMATION') {
      section = 'module';
    } else if (line === 'SYNOPSIS') {
      section = 'synopsis';
    } else if (line === 'LEARNING OBJECTIVES') {
      section = 'objectives';
    } else if (line === 'TARGET AUDIENCE') {
      section = 'audience';
    } else if (line.startsWith('Short Name:')) {
      // already have title
    } else if (line.startsWith('Course Code:')) {
      // already have moduleCode
    } else if (line.startsWith('Course Family:')) {
      course.courseFamily = line.replace('Course Family: ', '');
    } else if (line.startsWith('Training Days:')) {
      course.trainingDays = parseInt(line.replace('Training Days: ', ''));
    } else if (line.startsWith('Type:')) {
      // ignore
    } else if (line.startsWith('Favorite:')) {
      course.favorite = line.replace('Favorite: ', '').toLowerCase() === 'yes';
    } else if (line.startsWith('Status:')) {
      course.status = line.replace('Status: ', '');
    } else if (line.startsWith('Gross Fees:')) {
      // ignore
    } else if (line.startsWith('Brochure Link:')) {
      course.hyperlink = line.replace('Brochure Link: ', '');
    } else if (section === 'synopsis' && line && !line.includes('---')) {
      course.synopsis += line + '\n';
    } else if (section === 'objectives' && line && !line.includes('---')) {
      course.learningObjectives += line + '\n';
    } else if (section === 'audience' && line && !line.includes('---')) {
      course.targetAudience += line + '\n';
    }
  }

  // Clean up
  course.synopsis = course.synopsis.trim();
  course.learningObjectives = course.learningObjectives.trim();
  course.targetAudience = course.targetAudience.trim();

  return course;
}

async function postCourse(course) {
  try {
    const response = await axios.post(strapiUrl, {
      data: course
    }, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`Posted course: ${course.title}`);
  } catch (error) {
    console.error(`Error posting ${course.title}:`, error.response?.data || error.message);
  }
}

async function main() {
  const files = fs.readdirSync(courseDataDir).filter(f => f.endsWith('.txt'));
  for (const file of files) {
    const filePath = path.join(courseDataDir, file);
    const course = await parseCourseFile(filePath);
    await postCourse(course);
  }
}

main().catch(console.error);