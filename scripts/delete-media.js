const API_URL = 'https://clever-example-420715eeee.strapiapp.com/api/upload/files';

async function deleteAllMedia() {
  try {
    console.log('Fetching all media files...');

    // Get all media files
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.status}`);
    }

    const data = await response.json();
    const mediaFiles = data || [];

    console.log(`Found ${mediaFiles.length} media files to delete`);

    if (mediaFiles.length === 0) {
      console.log('No media files to delete');
      return;
    }

    // Delete media files one by one
    for (const file of mediaFiles) {
      console.log(`Deleting media file ${file.id} - ${file.name}`);

      const deleteResponse = await fetch(`${API_URL}/${file.id}`, {
        method: 'DELETE'
      });

      console.log(`Response status: ${deleteResponse.status}`);

      if (deleteResponse.status === 200) {
        console.log(`✓ Successfully deleted media file ${file.id}`);
      } else {
        const errorText = await deleteResponse.text();
        console.log(`✗ Failed to delete media file ${file.id}: ${deleteResponse.status} - ${errorText}`);
      }

      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('Finished deleting all media files');

    // Verify deletion
    console.log('Verifying deletion...');
    const verifyResponse = await fetch(API_URL);
    const verifyData = await verifyResponse.json();
    const remainingFiles = verifyData || [];

    console.log(`Remaining media files: ${remainingFiles.length}`);

    if (remainingFiles.length === 0) {
      console.log('✅ All media files successfully deleted!');
    } else {
      console.log('⚠️ Some media files may still remain');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

deleteAllMedia();