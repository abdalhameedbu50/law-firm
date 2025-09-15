#!/usr/bin/env python3
import os
import re

# Function to update header in HTML files
def update_header(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Add nav-update.css if not already present
    if '../css/nav-update.css' not in content and 'css/nav-update.css' not in content:
        content = content.replace('<link rel="stylesheet" href="../css/style.css">', 
                                '<link rel="stylesheet" href="../css/style.css">\n    <link rel="stylesheet" href="../css/nav-update.css">')
        content = content.replace('<link rel="stylesheet" href="css/style.css">', 
                                '<link rel="stylesheet" href="css/style.css">\n    <link rel="stylesheet" href="css/nav-update.css">')
    
    # Remove clients menu item
    content = re.sub(r'<li><a href="[^"]*clients\.html"[^>]*>عملاؤنا</a></li>\s*', '', content)
    content = re.sub(r'<li><a href="[^"]*pages/clients\.html"[^>]*>عملاؤنا</a></li>\s*', '', content)
    
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"Updated: {file_path}")

# Process all HTML files in the website
def process_website(root_dir):
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                update_header(file_path)

# Main execution
if __name__ == "__main__":
    website_dir = "/home/ubuntu/website_update"
    process_website(website_dir)
    print("All headers updated successfully!")
