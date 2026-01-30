const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch').default;
const TurndownService = require('turndown');

const courseDataDir = path.join(__dirname, 'course_data');
const strapiUrl = 'http://localhost:1337/api/courses';
const apiToken = '0ec5c0857e2d2da7b136a294a8d5ef819130214fbb362f26cd5fd9f4a868c60e25599130425d22af3d071d0c0bc315150507bc0033c72ef5a11d709e5ae44f6925935407b069a39444c5c84dafdd22a2262963b2007aa787a3032ca8bd99c75819ad47b44c51690993e1b97cd7862ce1cdabd5da410687f3aedfb923f9abe098';

const turndownService = new TurndownService(); // From .env

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

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
        console.log(`Deleted course: ${course.moduleCode}`);
      } else {
        console.error(`Error deleting ${course.moduleCode}:`, await deleteResponse.text());
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } catch (error) {
    console.error('Error deleting:', error);
  }
}

async function importCourses() {
  const allFiles = fs.readdirSync(courseDataDir).filter(file => file.endsWith('.txt'));
  const files = allFiles; // All files
  console.log('Found files:', files.length);

  for (const file of files) {
    console.log('Processing file:', file);
    const filePath = path.join(courseDataDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const jsonStart = content.indexOf('{');
    if (jsonStart === -1) {
      console.error('No JSON found in', file);
      continue;
    }
    const jsonContent = content.substring(jsonStart);
    const data = JSON.parse(jsonContent);

    const module = data.module;

    const title = module.module_lname;
    const slug = slugify(title);

    const synopsisMD = module.module_synopsis ? turndownService.turndown(module.module_synopsis) : '';
    const objectivesMD = module.module_objective ? turndownService.turndown(module.module_objective) : '';
    const audienceMD = module.target_audience ? turndownService.turndown(module.target_audience) : '';

    console.log(`Converting ${module.module_code}:`);
    console.log('Synopsis MD:', synopsisMD.substring(0, 100));
    console.log('Objectives MD:', objectivesMD.substring(0, 100));

    const scheduleInfo = data.schedule && data.schedule[0] ? `${data.schedule[0].Time_from} - ${data.schedule[0].Time_to}` : '';

    const payload = {
      data: {
        title: title,
        slug: slug,
        overview: synopsisMD,
        moduleCode: module.module_code,
        trainingDays: module.module_tdays,
        schedule: scheduleInfo,
        learningObjectives: objectivesMD,
        targetAudience: audienceMD,
        hyperlink: module.hyperlink,
        popular: module.favorite === 1,
        courseFamily: module.course_family,
        status: module.status
      }
    };

    try {
      const response = await fetch(strapiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        console.log(`Imported course: ${module.module_code}`);
      } else {
        console.error(`Error importing ${module.module_code}:`, await response.text());
      }
    } catch (error) {
      console.error(`Error importing ${module.module_code}:`, error.message);
    }
    // Delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function main() {
  await deleteAllCourses();
  await importCourses();
}

main().catch(console.error);