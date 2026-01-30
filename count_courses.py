#!/usr/bin/env python3
"""
Course Migration Script
Fetches all courses from the original AgileN Lite API and saves each course to a text file.
"""

import requests
import json
import os
from datetime import datetime

# API Configuration
API_BASE_URL = "https://api.agilenlite.com"
COURSES_ENDPOINT = "/courses"
COURSE_DETAIL_ENDPOINT = "/courses/getModule"

# Output directory
OUTPUT_DIR = "course_data"

def create_output_directory():
    """Create output directory if it doesn't exist"""
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        print(f"Created output directory: {OUTPUT_DIR}")

def fetch_all_courses():
    """Fetch all courses from the API"""
    try:
        # Build filter object
        filter_obj = {
            "limit": 200,  # Get all courses (we know there are ~102)
            "skip": 0,
            "conditions": {
                "status": "enable"
            },
            "order": {
                "favorite": "Z",
                "course_family": "A",
                "module_sname": "A"
            }
        }

        # Create URL with filter parameter
        filter_param = json.dumps(filter_obj)
        url = f"{API_BASE_URL}{COURSES_ENDPOINT}?filter={requests.utils.quote(filter_param)}"

        print(f"Fetching courses from: {API_BASE_URL}{COURSES_ENDPOINT}")
        print(f"With filter: {filter_param[:100]}...")

        response = requests.get(url)
        response.raise_for_status()

        data = response.json()
        print(f"API Response Keys: {data.keys() if isinstance(data, dict) else 'Not a dict'}")

        # Try different possible keys
        if isinstance(data, list):
            courses = data
        elif isinstance(data, dict):
            courses = data.get('data', data.get('courses', data.get('results', [])))
            total = data.get('total', len(courses))
            print(f"Total courses in database: {total}")
        else:
            courses = []

        print(f"Found {len(courses)} courses to process")
        return courses

    except Exception as e:
        print(f"Error fetching courses: {e}")
        import traceback
        traceback.print_exc()
        return []

def fetch_course_detail(module_code):
    """Fetch detailed information for a specific course"""
    try:
        url = f"{API_BASE_URL}{COURSE_DETAIL_ENDPOINT}/{module_code}"

        print(f"  Fetching details for: {module_code}")
        response = requests.get(url)
        response.raise_for_status()

        return response.json()

    except Exception as e:
        print(f"  Error fetching course detail for {module_code}: {e}")
        return None

def save_course_to_file(course_data, index):
    """Save course data to a text file"""
    if not course_data:
        return

    module = course_data.get('module', {})
    module_code = module.get('module_code', f'unknown_{index}')
    module_name = module.get('module_sname', 'Unknown Course')

    # Create a safe filename
    safe_filename = f"{index:03d}_{module_code}.txt".replace('/', '_').replace('\\', '_')
    filepath = os.path.join(OUTPUT_DIR, safe_filename)

    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write("=" * 80 + "\n")
            f.write(f"COURSE: {module_name}\n")
            f.write(f"CODE: {module_code}\n")
            f.write("=" * 80 + "\n\n")

            # Module Information
            f.write("MODULE INFORMATION\n")
            f.write("-" * 80 + "\n")
            f.write(f"Short Name: {module.get('module_sname', 'N/A')}\n")
            f.write(f"Course Code: {module.get('module_code', 'N/A')}\n")
            f.write(f"Course Family: {module.get('course_family', 'N/A')}\n")
            f.write(f"Training Days: {module.get('module_tdays', 'N/A')}\n")
            f.write(f"Type: {module.get('type', 'N/A')}\n")
            f.write(f"Favorite: {'Yes' if module.get('favorite') == 1 else 'No'}\n")
            f.write(f"Status: {module.get('status', 'N/A')}\n")
            f.write(f"Gross Fees: {module.get('gross_fees', 'N/A')}\n")

            if module.get('hyperlink'):
                f.write(f"Brochure Link: {module.get('hyperlink')}\n")

            f.write("\n")

            # Synopsis
            f.write("SYNOPSIS\n")
            f.write("-" * 80 + "\n")
            synopsis = module.get('module_synopsis', 'N/A')
            f.write(f"{synopsis}\n\n")

            # Learning Objectives
            f.write("LEARNING OBJECTIVES\n")
            f.write("-" * 80 + "\n")
            objectives = module.get('module_objective', 'N/A')
            f.write(f"{objectives}\n\n")

            # Target Audience
            f.write("TARGET AUDIENCE\n")
            f.write("-" * 80 + "\n")
            audience = module.get('target_audience', 'N/A')
            f.write(f"{audience}\n\n")

            # Module Outline
            if module.get('module_outline'):
                f.write("MODULE OUTLINE\n")
                f.write("-" * 80 + "\n")
                f.write(f"{module.get('module_outline')}\n\n")

            # Schedule Information
            schedules = course_data.get('schedule', [])
            if schedules:
                f.write("SCHEDULE INFORMATION\n")
                f.write("-" * 80 + "\n")
                for i, schedule in enumerate(schedules, 1):
                    f.write(f"\nRun {i}:\n")
                    f.write(f"  Run Number: {schedule.get('module_run_no', 'N/A')}\n")
                    f.write(f"  From Date: {schedule.get('module_ffdate', 'N/A')}\n")
                    f.write(f"  To Date: {schedule.get('module_ttdate', 'N/A')}\n")
                    f.write(f"  Time From: {schedule.get('Time_from', 'N/A')}\n")
                    f.write(f"  Time To: {schedule.get('Time_to', 'N/A')}\n")
                    f.write(f"  Training Days: {schedule.get('module_tdays', 'N/A')}\n")
                f.write("\n")

            # Raw JSON data
            f.write("\n" + "=" * 80 + "\n")
            f.write("RAW JSON DATA\n")
            f.write("=" * 80 + "\n")
            f.write(json.dumps(course_data, indent=2, ensure_ascii=False))

        print(f"  [OK] Saved to: {safe_filename}")
        return True

    except Exception as e:
        print(f"  [ERROR] Error saving course {module_code}: {e}")
        return False

def main():
    """Main execution function"""
    print("\n" + "=" * 80)
    print("AgileN Lite Course Migration Script")
    print("=" * 80 + "\n")

    # Create output directory
    create_output_directory()

    # Fetch all courses
    courses = fetch_all_courses()

    if not courses:
        print("\nNo courses found or error occurred.")
        return

    print(f"\nStarting to fetch details for {len(courses)} courses...\n")

    # Process each course
    successful = 0
    failed = 0

    for index, course in enumerate(courses, 1):
        module_code = course.get('module_code', f'unknown_{index}')
        module_name = course.get('module_sname', 'Unknown')

        print(f"[{index}/{len(courses)}] Processing: {module_name} ({module_code})")

        # Fetch detailed information
        course_detail = fetch_course_detail(module_code)

        # Save to file
        if save_course_to_file(course_detail, index):
            successful += 1
        else:
            failed += 1

        print()  # Empty line for readability

    # Summary
    print("\n" + "=" * 80)
    print("MIGRATION SUMMARY")
    print("=" * 80)
    print(f"Total courses: {len(courses)}")
    print(f"Successfully saved: {successful}")
    print(f"Failed: {failed}")
    print(f"Output directory: {OUTPUT_DIR}")
    print("=" * 80 + "\n")

if __name__ == "__main__":
    main()
