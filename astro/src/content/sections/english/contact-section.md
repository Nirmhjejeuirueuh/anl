---
enable: true # Control the visibility of this section across all pages where it is used
title: "Let's Start a **Conversation**"
description: "Ready to transform your organisation? Our team of experts is here to help you embrace the evolving technological landscape. Whether you're looking for training, consulting, or partnership opportunities, we're here to support your journey."
subtitle: "Get In Touch"

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
    - icon: "Linkedin"
      label: "Connect with us"
      value: "[AgilenLite](https://www.linkedin.com/company/agilenlite)"

social:
  enable: false
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
    - label: "Subject"
      placeholder: "Select a subject"
      name: "Subject"
      required: true
      halfWidth: false
      dropdown:
        type: ""
        items:
          - label: "Request for training"
            value: "Request for training"
          - label: "Share your testimonial"
            value: "Share your testimonial"
          - label: "Request for services"
            value: "Request for services"
          - label: "Report an issue"
            value: "Report an issue"
          - label: "Request for EC Council Online Programmes"
            value: "Request for EC Council Online Programmes"
          - label: "Provide your feedback"
            value: "Provide your feedback"
          - label: "Express interest for 'Art of Cyber Resilience' Book"
            value: "Express interest for 'Art of Cyber Resilience' Book"
    - label: "Title"
      placeholder: "Select the title"
      name: "Title"
      required: true
      halfWidth: true
      dropdown:
        type: ""
        items:
          - label: "Mr."
            value: "Mr."
          - label: "Ms."
            value: "Ms."
          - label: "Mrs."
            value: "Mrs."
          - label: "Dr."
            value: "Dr."
          - label: "Prof."
            value: "Prof."
    - label: "Given / First name"
      placeholder: "Given / First name"
      name: "Given / First name"
      required: true
      halfWidth: true
      defaultValue: ""
    - label: "Family / Last name"
      placeholder: "Family / Last name"
      name: "Family / Last name"
      required: true
      halfWidth: true
      defaultValue: ""
    - label: "Your email address"
      placeholder: "Your email address"
      name: "Email Address"
      required: true
      type: "email"
      halfWidth: true
      defaultValue: ""
    - label: "Designation"
      placeholder: "Designation"
      name: "Designation"
      required: true
      type: "text"
      halfWidth: true
      defaultValue: ""
    - label: "Company's name"
      placeholder: "Company's name"
      name: "Company's name"
      required: true
      type: "text"
      halfWidth: true
      defaultValue: ""
    - note: info
      parentClass: "col-span-2 text-sm font-medium text-gray-700 mt-4"
      content: "Training of interest *"
    - label: "Agile & DevOps Practice"
      value: "Agile & DevOps Practice"
      type: "checkbox"
      name: "Training of interest"
      halfWidth: true
      checked: false
    - label: "Cybersecurity, Risks, Governance & Control"
      value: "Cybersecurity, Risks, Governance & Control"
      type: "checkbox"
      name: "Training of interest"
      halfWidth: true
      checked: false
    - label: "IT Service & Operations Management"
      value: "IT Service & Operations Management"
      type: "checkbox"
      name: "Training of interest"
      halfWidth: true
      checked: false
    - label: "Technology Services in Banking & Finance"
      value: "Technology Services in Banking & Finance"
      type: "checkbox"
      name: "Training of interest"
      halfWidth: true
      checked: false
    - label: "Adaptive Technology & Services"
      value: "Adaptive Technology & Services"
      type: "checkbox"
      name: "Training of interest"
      halfWidth: true
      checked: false
    - label: "Change Management Series"
      value: "Change Management Series"
      type: "checkbox"
      name: "Training of interest"
      halfWidth: true
      checked: false
    - label: "Cloud Computing"
      value: "Cloud Computing"
      type: "checkbox"
      name: "Training of interest"
      halfWidth: true
      checked: false
    - label: "Cloud Operations"
      value: "Cloud Operations"
      type: "checkbox"
      name: "Training of interest"
      halfWidth: true
      checked: false
    - label: "Data Analytics & Data Management"
      value: "Data Analytics & Data Management"
      type: "checkbox"
      name: "Training of interest"
      halfWidth: true
      checked: false
    - label: "Environmental, Social, and Governance Risks"
      value: "Environmental, Social, and Governance Risks"
      type: "checkbox"
      name: "Training of interest"
      halfWidth: true
      checked: false
    - label: "Fraud Risk Management"
      value: "Fraud Risk Management"
      type: "checkbox"
      name: "Training of interest"
      halfWidth: true
      checked: false
    - label: "Generative AI"
      value: "Generative AI"
      type: "checkbox"
      name: "Training of interest"
      halfWidth: true
      checked: false
    - label: "Requirement & Software Engineering"
      value: "Requirement & Software Engineering"
      type: "checkbox"
      name: "Training of interest"
      halfWidth: true
      checked: false
    - label: "Technology Product Management"
      value: "Technology Product Management"
      type: "checkbox"
      name: "Training of interest"
      halfWidth: true
      checked: false
    - label: "Others"
      value: "Others"
      type: "checkbox"
      name: "Training of interest"
      halfWidth: true
      checked: false
    - label: "Please enter your details here"
      tag: "textarea"
      defaultValue: ""
      rows: "6"
      placeholder: "Please enter your details here (max 500 characters)"
      name: "Details"
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
    - note: info
      parentClass: "col-span-2 text-xs"
      content: "Required field indicated with *"
    - note: success
      parentClass: "hidden text-sm message success text-green-600 bg-green-50 border border-green-200 p-3 rounded-md"
      content: "**✓ Success!** Thank you for your enquiry! We'll get back to you within 24 hours."
    - note: error
      parentClass: "hidden text-sm message error text-red-600 bg-red-50 border border-red-200 p-3 rounded-md"
      content: "**⚠️ Error:** Please fill in all required fields marked with * and try again. If the problem persists, contact us at [enquiry@agilenlite.com](mailto:enquiry@agilenlite.com)"
---
