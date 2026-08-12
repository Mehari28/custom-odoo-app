import re
import sys

def fix_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = re.compile(
        r'<field name="view_mode">\s*\n\s*([^<\n][^<]*?)\s*\n\s*</field>',
        re.MULTILINE
    )

    def repl(m):
        value = m.group(1).strip()
        # normalize internal whitespace around commas too
        value = re.sub(r'\s*,\s*', ',', value)
        return f'<field name="view_mode">{value}</field>'

    new_content, n = pattern.subn(repl, content)

    if n:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
    print(f"{path}: fixed {n} occurrence(s)")

for path in sys.argv[1:]:
    fix_file(path)
