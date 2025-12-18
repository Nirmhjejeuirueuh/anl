---
enable: true # Control the visibility of this section across all pages where it is used
title: "Get In Touch"
description: "Ready to transform your organization? Our team of experts is here to help you embrace the evolving technological landscape."
subtitle: "Contact Us"

contactList:
  enable: true
  list:
    # For icon names, see [Lucide Icons](https://lucide.dev/icons/?search=) (remember to capitalize the icon name)
    - icon: "Phone"
      label: "Call us now"
      value: "+65 8843 9403"
    - icon: "Mail"
      label: "Email us"
      value: "enquiry@agilenlite.com"
    - icon: "MapPin"
      label: "Location"
      value: "Singapore"

social:
  enable: true
  title: "Connect with us"

# Check config.toml file for form action related settings
form:
  emailSubject: "New enquiry from AgilenLite website"
  submitButton:
    label: "Send Message"
    showIcon: "true"
    variant: "fill"
    hoverEffect: "text-flip"
  inputs:
    - label: ""
      placeholder: "Full Name"
      name: "Full Name"
      required: true
      halfWidth: true
      defaultValue: ""
    - label: ""
      placeholder: "Email Address"
      name: "Email Address"
      required: true
      type: "email"
      halfWidth: true
      defaultValue: ""
    - label: ""
      placeholder: "Phone Number"
      name: "Phone Number"
      required: false
      type: "text"
      halfWidth: true
      defaultValue: ""
    - label: ""
      placeholder: "Company"
      name: "Company"
      required: false
      type: "text"
      halfWidth: true
      defaultValue: ""
    - label: ""
      placeholder: "Subject"
      name: "Subject"
      required: true
      halfWidth: false
      dropdown:
        type: ""
        items:
          - label: "Training Enquiry"
            value: "Training Enquiry"
          - label: "Consulting Enquiry"
            value: "Consulting Enquiry"
          - label: "General Enquiry"
            value: "General Enquiry"
    - label: ""
      tag: "textarea"
      defaultValue: ""
      rows: "4"
      placeholder: "How can we help you?"
      name: "Message"
      required: true
      halfWidth: false
    - label: "I agree to the [privacy policy](/privacy-policy/)."
      name: "Agreed Privacy"
      value: "Agreed"
      checked: false
      required: true
      type: "checkbox"
      halfWidth: false
      defaultValue: ""
    - note: success
      parentClass: "hidden text-sm message success"
      content: Thank you for your enquiry! We'll get back to you within 24 hours.
    - note: deprecated
      parentClass: "hidden text-sm message error"
      content: Something went wrong! Please email us directly at [enquiry@agilenlite.com](mailto:enquiry@agilenlite.com)
---
