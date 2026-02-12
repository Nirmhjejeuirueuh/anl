const API_URL = 'https://clever-example-420715eeee.strapiapp.com/api/courses';

async function deleteAllCourses() {
  try {
    console.log('Fetching all courses...');

    // Get all courses with higher limit
    const response = await fetch(`${API_URL}?pagination[limit]=100`);
    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.status}`);
    }

    const data = await response.json();
    const courses = data.data || [];

    console.log(`Found ${courses.length} courses to delete`);

    if (courses.length === 0) {
      console.log('No courses to delete');
      return;
    }

    // Delete courses one by one
    for (const course of courses) {
      console.log(`Deleting course ${course.id} - ${course.title}`);

      const deleteResponse = await fetch(`${API_URL}/${course.id}`, {
        method: 'DELETE'
      });

      console.log(`Response status: ${deleteResponse.status}`);
      console.log(`Response headers:`, Object.fromEntries(deleteResponse.headers.entries()));

      if (deleteResponse.status === 204) {
        console.log(`✓ Successfully deleted course ${course.id}`);
      } else {
        const errorText = await deleteResponse.text();
        console.log(`✗ Failed to delete course ${course.id}: ${deleteResponse.status} - ${errorText}`);
      }

      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('Finished deleting all courses');

    // Verify deletion
    console.log('Verifying deletion...');
    const verifyResponse = await fetch(`${API_URL}?pagination[limit]=100`);
    const verifyData = await verifyResponse.json();
    const remainingCourses = verifyData.data || [];

    console.log(`Remaining courses: ${remainingCourses.length}`);

    if (remainingCourses.length === 0) {
      console.log('✅ All courses successfully deleted!');
    } else {
      console.log('⚠️ Some courses may still remain');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

deleteAllCourses();