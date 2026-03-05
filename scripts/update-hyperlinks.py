#!/usr/bin/env python3
import urllib.request
import urllib.parse
import json

BASE_URL = "http://localhost:1337"

hyperlinks = {
    "AGDV-001": "https://academy.smu.edu.sg/agile-successful-project-implementation-1421",
    "CHMG-001": "https://academy.smu.edu.sg/executive-certificate-change-management-mastery-business-module-1-adopting-change-mindset-financial",
    "CHMG-002": "https://academy.smu.edu.sg/executive-certificate-change-management-mastery-business-module-2-preparing-successful-change-9781",
    "CHMG-003": "https://academy.smu.edu.sg/executive-certificate-change-management-mastery-business-module-3-adopting-agile-change-management",
    "CRGC-001": "https://academy.smu.edu.sg/graduate-certificate-digital-finance-module-6-managing-expanding-cyber-risks-1981",
    "CRGC-004": "https://academy.smu.edu.sg/anti-money-laundering-and-its-ecosystem-1151",
    "CRGC-028": "https://agilenlitesg.sharepoint.com/:b:/s/ProgrammeProspectus/EaDQXd7V8JRGqulXszfNQPcB_tuQtfosq7WLCMbtvUdHfg?e=UJP0Ki",
    "CRGC-030": "https://agilenlitesg.sharepoint.com/:b:/s/ProgrammeProspectus/EWwR1gL4ydxCsMp03OSJA04BncG4KHqZthYBvJg2mzX0Ow?e=aTe9Jc",
    "CRGC-035": "https://agilenlitesg.sharepoint.com/:b:/s/ProgrammeProspectus/EZn6FsRN2ztDu9yt517YKtQBJrjD3b7kELJC4Ese4gOuqA?e=ByW06Y",
    "CRGC-036": "https://agilenlitesg.sharepoint.com/:b:/s/ProgrammeProspectus/EbSnB_l6mVBCglGwg9bIF-0BwItW4wRQM1k8hcO_Ulhy4g?e=fFNTic",
    "CRGC-037": "https://agilenlitesg.sharepoint.com/:b:/s/ProgrammeProspectus/Ec0fstcJhYJLjMjk4n1Q5wsBYbshwmKQB7JtKZ26E3asaA?e=lxDUUe",
    "CRGC-039": "https://agilenlitesg.sharepoint.com/:b:/s/ProgrammeProspectus/Edan7v1FTy1IktQkig37aQQBAcSyNwK228DyWUONOx66GQ?e=HwrMh5",
    "CRGC-040": "https://agilenlitesg.sharepoint.com/:b:/s/ProgrammeProspectus/EX-lCP23-Z1KsE8VW8qVhQQBqJPFvqvf0UFgvofUfIc2sg?e=QsGMq9",
    "CRGC-041": "https://eservices.isca.org.sg/CourseDetailClone?courseMasterId=a0gfP000000sElxQAE",
    "FRRM-001": "https://agilenlitesg.sharepoint.com/:b:/s/ProgrammeProspectus/EdesnWwjOY1Buwi-3PR9f5ABl1drwuEWgNmiavhxmNLmwQ?e=aDmKIh",
    "ITSO-010": "https://academy.smu.edu.sg/stakeholder-and-it-outsourcing-contract-management-3491",
    "TSBF-003": "https://academy.smu.edu.sg/project-management-practice-financial-industry-3421",
}

for code, url in hyperlinks.items():
    # GET: find course by moduleCode
    get_url = f"{BASE_URL}/api/courses?filters[moduleCode][$eq]={code}&fields[0]=documentId&fields[1]=moduleCode&fields[2]=hyperlink"
    try:
        with urllib.request.urlopen(get_url) as r:
            data = json.loads(r.read())
    except Exception as e:
        print(f"[ERROR] GET {code}: {e}")
        continue

    if not data["data"]:
        print(f"[NOT FOUND] {code}")
        continue

    course = data["data"][0]
    doc_id = course["documentId"]

    # PUT: update hyperlink
    put_url = f"{BASE_URL}/api/courses/{doc_id}"
    payload = json.dumps({"data": {"hyperlink": url}}).encode("utf-8")
    req = urllib.request.Request(
        put_url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="PUT"
    )
    try:
        with urllib.request.urlopen(req) as r:
            print(f"[OK] {code} updated")
    except Exception as e:
        print(f"[ERROR] PUT {code}: {e}")
