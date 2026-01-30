import os
import json
import requests
from pathlib import Path

# Strapi API endpoint
STRAPI_URL = 'http://localhost:1337/api/courses'
# If authentication is needed, add token here
HEADERS = {
    'Content-Type': 'application/json',
    # 'Authorization': 'Bearer YOUR_TOKEN_HERE'  # Uncomment and add token if needed
}

def parse_course_file(file_path):
    """Parse a course .txt file and extract data."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the JSON part (starts with {)
    json_start = content.find('{')
    if json_start == -1:
        raise ValueError(f"No JSON found in {file_path}")

    json_content = content[json_start:]
    data = json.loads(json_content)

    module = data['module']

    # Map to Strapi fields
    course_data = {
        'title': module['module_lname'].strip(),
        'description': module['module_synopsis'],
        'content': module['module_objective'] + '\n\n' + module['target_audience'],
        'moduleCode': module['module_code'],
        'trainingDays': module['module_tdays'],
        'level': module.get('course_family', ''),
        'categories': [module.get('course_family', '')] if module.get('course_family') else [],
        # Add other optional fields as needed
        'excerpt': module['module_synopsis'][:200] + '...' if len(module['module_synopsis']) > 200 else module['module_synopsis'],
    }

    return course_data

def post_course_to_strapi(course_data):
    """Post course data to Strapi."""
    try:
        response = requests.post(STRAPI_URL, json=course_data, headers=HEADERS)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error posting course '{course_data['title']}': {e}")
        return None

def main():
    course_data_dir = Path('course_data')
    if not course_data_dir.exists():
        print("course_data directory not found!")
        return

    txt_files = list(course_data_dir.glob('*.txt'))
    print(f"Found {len(txt_files)} course files")

    for file_path in txt_files:
        try:
            course_data = parse_course_file(file_path)
            print(f"Processing: {course_data['title']}")

            result = post_course_to_strapi(course_data)
            if result:
                print(f"Successfully created course: {result['data']['id']}")
            else:
                print(f"Failed to create course: {course_data['title']}")

        except Exception as e:
            print(f"Error processing {file_path}: {e}")

if __name__ == '__main__':
    main()