import re

def parse_values(values_str):
    values = []
    current = ''
    in_quote = False
    i = 0
    while i < len(values_str):
        char = values_str[i]
        if char == "'" and not in_quote:
            in_quote = True
        elif char == "'" and in_quote:
            if i + 1 < len(values_str) and values_str[i + 1] == "'":
                # Escaped quote
                current += "'"
                i += 1  # skip the next '
            else:
                in_quote = False
        elif char == ',' and not in_quote:
            values.append(current)
            current = ''
            i += 1
            continue
        else:
            current += char
        i += 1
    if current:
        values.append(current)
    return values

# Read the SQL file line by line
courses = []
with open('agilenlite_courses_backup.sql', 'r') as f:
    for line in f:
        if line.startswith("INSERT INTO `module` VALUES"):
            # Extract the VALUES content
            start = line.find('(')
            end = line.rfind(');')
            if start != -1 and end != -1:
                values_str = line[start+1:end]
                parts = parse_values(values_str)
                if len(parts) >= 14:
                    code = parts[4].strip("'")
                    brochure = parts[13].strip("'")
                    if brochure:
                        courses.append((code, brochure))

# Sort by code
courses.sort(key=lambda x: x[0])

# Output
for code, url in courses:
    print(f"{code} – {url}")