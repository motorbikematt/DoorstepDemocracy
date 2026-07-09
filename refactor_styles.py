import os
import re

css_additions = []
class_counter = 1
style_map = {}

def get_class_name(style_str):
    global class_counter
    # predefined common maps
    predef = {
        'margin-top: 0.5rem;': 'mt-2',
        'margin-top: 1rem;': 'mt-4',
        'margin-top: 2rem;': 'mt-8',
        'margin-top: 3rem;': 'mt-12',
        'margin-bottom: 1rem;': 'mb-4',
        'margin-bottom: 2rem;': 'mb-8',
        'margin-bottom: 3rem;': 'mb-12',
        'margin-right: 1rem;': 'mr-4',
        'color: var(--text-secondary);': 'text-secondary',
        'color: var(--accent-blue);': 'text-blue',
        'color: var(--accent-gold);': 'text-gold',
        'color: var(--accent-amber);': 'text-amber',
        'grid-column: 1 / -1;': 'col-full',
        'text-align: center; margin-top: 3rem;': 'text-center mt-12',
        'margin-bottom: 3rem; text-align: center;': 'text-center mb-12',
        'font-size: 1.5rem;': 'text-xl',
    }
    
    style_str = style_str.strip()
    if style_str in predef:
        cls = predef[style_str]
        if cls not in style_map.values():
            style_map[style_str] = cls
            css_additions.append(f".{cls} {{ {style_str} }}")
        return cls
        
    if style_str in style_map:
        return style_map[style_str]
        
    cls = f"util-{class_counter}"
    class_counter += 1
    style_map[style_str] = cls
    css_additions.append(f".{cls} {{ {style_str} }}")
    return cls

for d, _, files in os.walk('.'):
    if 'node_modules' in d or 'local' in d or '.git' in d: continue
    for f in files:
        if f.endswith('.html'):
            filepath = os.path.join(d, f)
            content = open(filepath, encoding='utf-8').read()
            
            def replacer(match):
                before = match.group(1)
                style = match.group(2)
                cls = get_class_name(style)
                # Check if there's an existing class attribute
                if 'class="' in before:
                    return re.sub(r'class="([^"]*)"', f'class="\\1 {cls}"', before)
                else:
                    return f'{before} class="{cls}"'
                    
            # Find elements with style attributes
            # Regex captures the opening tag up to the style attribute, then the style content
            new_content = re.sub(r'(<[a-zA-Z0-9]+(?:[^>]*?))\s*style="([^"]+)"', replacer, content)
            
            if new_content != content:
                open(filepath, 'w', encoding='utf-8').write(new_content)

css = "\n/* Utility classes from refactor */\n" + "\n".join(css_additions) + "\n"
open('style.css', 'a', encoding='utf-8').write(css)
print("Refactored styles and updated HTML files and style.css")
