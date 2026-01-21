import os

path = r'c:\Users\STUDENT PC 02\Documents\AgroGuardAI\index.html'
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    # Remove characters that look like garbled symbols but keep common text
    # We want to replace things like ðŸ  , ðŸ“¦, â­ , etc.
    # A simple way is to remove non-ASCII characters that aren't Naira
    
    new_line = ""
    for char in line:
        if ord(char) < 128:
            new_line += char
        elif char == '₦':
            new_line += char
        else:
            # Skip other non-ascii for now to clean up symbols
            continue
    new_lines.append(new_line)

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Text cleanup complete")
