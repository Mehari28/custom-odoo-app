import re
import sys

def fix_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Collapse <field name="name">\n   value \n</field> and
    # <field name="model">\n   value \n</field> onto a single line.
    # Only touches these two field names, and only when the value has no nested tags.
    pattern = re.compile(
        r'<field name="(name|model)">\s*\n\s*([^<\n][^<]*?)\s*\n\s*</field>',
        re.MULTILINE
    )

    def repl(m):
        field, value = m.group(1), m.group(2).strip()
        return f'<field name="{field}">{value}</field>'

    new_content, n = pattern.subn(repl, content)

    if n:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
    print(f"{path}: fixed {n} occurrence(s)")

for path in sys.argv[1:]:
    fix_file(path)
