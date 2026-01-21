import os

path = r'c:\Users\STUDENT PC 02\Documents\AgroGuardAI\index.html'
with open(path, 'rb') as f:
    content = f.read()

# Replace known garbled sequences (UTF-8 bytes for emojis)
# f0 9f 8f a0 -> ðŸ  
# f0 9f 8d 8b -> ðŸ Ž
# f0 9f 93 8d -> ðŸ“ 
# e2 ad 90    -> â­ 
# f0 9f 93 a6 -> ðŸ“¦
# f0 9f 92 b3 -> ðŸ’³

to_remove = [
    b'\xf0\x9f\x8f\xa0', # Home
    b'\xf0\x9f\x8d\x8b', # Lemon
    b'\xf0\x9f\x93\x8d', # Pin
    b'\xe2\xad\x90',     # Star
    b'\xf0\x9f\x93\xa6', # Package
    b'\xf0\x9f\x92\xb3', # Card
    b'\xef\xbb\xbf'      # BOM (we can leave it or remove it, but let's leave it for now)
]

for seq in to_remove:
    content = content.replace(seq, b'')

# Also handle the specific strings if they were already garbled in the source as literal chars
# But usually they are just UTF-8 bytes shown as symbols.

with open(path, 'wb') as f:
    f.write(content)

print("Cleanup complete")
