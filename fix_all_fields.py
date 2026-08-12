import re
import sys

# Field names that should always hold a plain single-line value (no nested XML)
SIMPLE_FIELDS = [
    "name", "model", "res_model", "view_mode", "view_id", "binding_model_id",
    "target", "type", "domain", "context", "sequence", "priority", "groups_id",
    "res_id", "usage", "inherit_id", "key", "field_parent", "auto_search",
]

def fix_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    total = 0
    for field in SIMPLE_FIELDS:
        pattern = re.compile(
            r'<field name="' + re.escape(field) + r'">\s*\n\s*([^<\n][^<]*?)\s*\n\s*</field>',
            re.MULTILINE
        )

        def repl(m):
            value = m.group(1).strip()
            value = re.sub(r'\s*,\s*', ',', value)
            return f'<field name="{field}">{value}</field>'

        content, n = pattern.subn(repl, content)
        total += n

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"{path}: fixed {total} occurrence(s)")

for path in sys.argv[1:]:
    fix_file(path)
