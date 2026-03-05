#!/usr/bin/env python3
import re

def extract_course_data(sql_file_path):
    courses = []
    with open(sql_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all INSERT INTO `module` statements
    insert_pattern = r"INSERT INTO `module` VALUES \((.*?)\);"
    inserts = re.findall(insert_pattern, content, re.DOTALL)

    for insert in inserts:
        # Split by comma, but be careful with quoted strings
        # This is a simple approach - split by comma but handle quotes
        values = []
        current_value = ""
        in_quotes = False
        quote_char = None

        for char in insert:
            if not in_quotes and char in ("'", '"'):
                in_quotes = True
                quote_char = char
                current_value += char
            elif in_quotes and char == quote_char:
                in_quotes = False
                current_value += char
            elif not in_quotes and char == ',':
                values.append(current_value.strip())
                current_value = ""
            else:
                current_value += char

        # Add the last value
        if current_value.strip():
            values.append(current_value.strip())

        if len(values) >= 14:
            # Remove quotes from values
            cleaned_values = []
            for val in values:
                val = val.strip()
                if (val.startswith("'") and val.endswith("'")) or (val.startswith('"') and val.endswith('"')):
                    val = val[1:-1]
                cleaned_values.append(val)

            category = cleaned_values[3]
            code = cleaned_values[4]
            title = cleaned_values[5]
            brochure_link = cleaned_values[13] if len(cleaned_values) > 13 else ""

            if brochure_link:  # Only include courses with brochure links
                courses.append({
                    'code': f"{category}-{code}",
                    'title': title,
                    'brochure_link': brochure_link
                })

    return courses

if __name__ == "__main__":
    sql_file = r"b:\Projects\Work\Axcer\anl-revamp\agilenlite_courses_backup.sql"
    courses = extract_course_data(sql_file)

    print(f"Found {len(courses)} courses with brochure links:")
    for course in courses:
        print(f"{course['code']}: {course['brochure_link']}")