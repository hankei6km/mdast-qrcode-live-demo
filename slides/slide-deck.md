---
title: QR code
description: Slide with embedded QR code
theme: gaia
class: gaia
---

<!--
_class:
  - lead
  - gaia
-->

# **QR** code

## mdast-qrcode exmaple slide

https://github.com/hankei6km/mdast-qrcode

![bg left](qrcode:https://github.com/hankei6km)

---

## QR code (url)

source:

```markdown
![h:200](qrcode:https://github.com/hankei6km/mdast-qrcode)
https://github.com/hankei6km/mdast-qrcode
```

yield:

![h:200](qrcode:https://github.com/hankei6km/mdast-qrcode)
https://github.com/hankei6km/mdast-qrcode

---

## QR code (alt)

source:

```markdown
![h:200:qrcode:https://github.com/hankei6km/mdast-qrcode](mdast-qrcode.png)
https://github.com/hankei6km/mdast-qrcode
```

yield:

![h:200:qrcode:https://github.com/hankei6km/mdast-qrcode](mdast-qrcode.png)
https://github.com/hankei6km/mdast-qrcode

---

## QR code (link)

source:

```markdown
[![h:200](mdast-qrcode.png)](https://github.com/hankei6km/mdast-qrcode)
https://github.com/hankei6km/mdast-qrcode
```

yield:

[![h:200](mdast-qrcode.png)](https://github.com/hankei6km/mdast-qrcode)
https://github.com/hankei6km/mdast-qrcode
