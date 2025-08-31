#!/usr/bin/env python3
"""
سكريبت لإضافة ملفات CSS و JavaScript المطلوبة لجميع صفحات HTML
- يضمن إضافة hover-fix.css و hover-fix.js (موجود سابقاً)
- يضيف أيضاً social-fix.css و social-fix.js لجميع الصفحات
"""

import os
import re


def ensure_social_assets(content: str) -> str:
    """إضافة social-fix.css و js/social-fix.js إن لم تكن موجودة"""
    # CSS: social-fix.css
    if 'css/social-fix.css' not in content:
        inserted = False
        # حاول بعد responsive.css أولاً
        new_content, n = re.subn(
            r'(\<link rel="stylesheet" href="css/responsive\.css">)',
            r'\1\n    <link rel="stylesheet" href="css/social-fix.css">',
            content,
            count=1
        )
        if n:
            content = new_content
            inserted = True
        else:
            # حاول بعد hover-fix.css
            new_content, n = re.subn(
                r'(\<link rel="stylesheet" href="css/hover-fix\.css">)',
                r'\1\n    <link rel="stylesheet" href="css/social-fix.css">',
                content,
                count=1
            )
            if n:
                content = new_content
                inserted = True
        if not inserted:
            # كحل أخير: قبل </head>
            content = re.sub(
                r'(</head>)',
                r'    <link rel="stylesheet" href="css/social-fix.css">\n\1',
                content,
                count=1
            )

    # JS: social-fix.js (مع كسر كاش اختياري)
    if 'js/social-fix.js' not in content:
        inserted = False
        # بعد hover-fix.js إن وجد
        new_content, n = re.subn(
            r'(\<script src="js/hover-fix\.js"></script>)',
            r'\1\n    <script src="js/social-fix.js?v=1"></script>',
            content,
            count=1
        )
        if n:
            content = new_content
            inserted = True
        else:
            # بعد main.js إن وجد
            new_content, n = re.subn(
                r'(\<script src="js/main\.js"></script>)',
                r'\1\n    <script src="js/social-fix.js?v=1"></script>',
                content,
                count=1
            )
            if n:
                content = new_content
                inserted = True
        if not inserted:
            # كحل أخير: قبل </body>
            content = re.sub(
                r'(</body>)',
                r'    <script src="js/social-fix.js?v=1"></script>\n\1',
                content,
                count=1
            )

    return content


def update_html_file(file_path):
    """تحديث ملف HTML واحد"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        changed = False

        # التحقق من وجود hover-fix.css
        if 'hover-fix.css' not in content:
            content2, n = re.subn(
                r'(<link rel="stylesheet" href="css/responsive\.css">)',
                r'\1\n    <link rel="stylesheet" href="css/hover-fix.css">',
                content,
                count=1
            )
            if n:
                content = content2
                print(f"✅ تم إضافة hover-fix.css إلى {file_path}")
                changed = True

        # التحقق من وجود hover-fix.js
        if 'hover-fix.js' not in content:
            content2, n = re.subn(
                r'(\<script src="js/main\.js"></script>)',
                r'\1\n    <script src="js/hover-fix.js"></script>',
                content,
                count=1
            )
            if n:
                content = content2
                print(f"✅ تم إضافة hover-fix.js إلى {file_path}")
                changed = True

        # ضمان إضافة social-fix (CSS/JS)
        before_social = content
        content = ensure_social_assets(content)
        if content != before_social:
            print(f"✅ تم إضافة social-fix إلى {file_path}")
            changed = True

        # حفظ الملف المحدث فقط إذا حدثت تغييرات
        if changed:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

        return True

    except Exception as e:
        print(f"❌ خطأ في تحديث {file_path}: {e}")
        return False


def main():
    """الدالة الرئيسية"""
    # قائمة الصفحات المراد تحديثها (باستثناء index.html)
    html_files = [
        'car-shades.html',
        'garden-shades.html',
        'pool-shades.html',
        'school-shades.html',
        'pvc-shades.html',
        'wooden-fences.html',
        'iron-fences.html',
        'fabric-fences.html',
        'hair-houses.html',
        'hangars.html',
        'tiles.html',
        'cladding.html',
        'cantilever-shades.html',
        'pyramid-shades.html',
        'polyethylene-shades.html',
        'wooden-shades.html',
        'tensile-structures.html',
        'market-shades.html',
        'mosque-shades.html',
        'hanging-shades.html',
        'conical-shades.html',
        'school-fences.html',
        'nets.html',
        'shades.html',
        'fences.html',
        'gallery.html',
        'latest-works.html'
    ]

    updated_count = 0
    total_count = 0

    for file_name in html_files:
        if os.path.exists(file_name):
            total_count += 1
            if update_html_file(file_name):
                updated_count += 1
        else:
            print(f"⚠️ الملف غير موجود: {file_name}")

    print(f"\n🎉 تم تحديث {updated_count} من أصل {total_count} ملف")
    print("✅ جميع الصفحات تحتوي الآن على ملفات social-fix و hover-fix!")


if __name__ == "__main__":
    main()
