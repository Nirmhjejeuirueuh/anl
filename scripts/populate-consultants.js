#!/usr/bin/env node

// Script to populate consultant data in Strapi
// Run this after starting the Strapi CMS

const consultants = [
  {
    title: "IT and Security Risk Assessment",
    slug: "it-and-security-risk-assessment",
    description: "In IT and Security Risk Assessment, AgilenLite adopts a systematic and practical approach in delivering this service. We evaluate your IT and security environment against regulatory and industry standards to uncover real risks that matter to your business.",
    content: `<h2>Our Assessment Process</h2>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 2rem 0;">

  <div style="border: 1px solid #ddd; border-radius: 12px; overflow: hidden; background: #fff; transition: transform 0.3s, box-shadow 0.3s;">
    <img src="https://agilenlite-web-images.s3.ap-southeast-1.amazonaws.com/Consulting-IT+and+Security+Risk+Assessment/1.+Assess-Organisation's-Security-Posture.jpg" alt="Assess Organisation's Security Posture" style="width: 100%; height: 200px; object-fit: cover;">
    <div style="padding: 1rem;">
      <h3>Assess Organisation's Security Posture</h3>
      <p>We evaluate your IT and security environment against regulatory and industry standards to uncover real risks that matter to your business.</p>
    </div>
  </div>

  <div style="border: 1px solid #ddd; border-radius: 12px; overflow: hidden; background: #fff; transition: transform 0.3s, box-shadow 0.3s;">
    <img src="https://agilenlite-web-images.s3.ap-southeast-1.amazonaws.com/Consulting-IT+and+Security+Risk+Assessment/2.+Report-Gaps-n-Improvement-Plans.jpg" alt="Highlight Gaps and Improvement Plans" style="width: 100%; height: 200px; object-fit: cover;">
    <div style="padding: 1rem;">
      <h3>Highlight Gaps and Improvement Plans</h3>
      <p>We identify key weaknesses and provide a clear, prioritised action plan to strengthen your security posture.</p>
    </div>
  </div>

  <div style="border: 1px solid #ddd; border-radius: 12px; overflow: hidden; background: #fff; transition: transform 0.3s, box-shadow 0.3s;">
    <img src="https://agilenlite-web-images.s3.ap-southeast-1.amazonaws.com/Consulting-IT+and+Security+Risk+Assessment/3.+Recommend-Best-Practices.jpg" alt="Propose Best Practices" style="width: 100%; height: 200px; object-fit: cover;">
    <div style="padding: 1rem;">
      <h3>Propose Best Practices</h3>
      <p>We align your operations with proven, achievable practices that balance compliance, efficiency, and risk reduction.</p>
    </div>
  </div>

  <div style="border: 1px solid #ddd; border-radius: 12px; overflow: hidden; background: #fff; transition: transform 0.3s, box-shadow 0.3s;">
    <img src="https://agilenlite-web-images.s3.ap-southeast-1.amazonaws.com/Consulting-IT+and+Security+Risk+Assessment/4.+Review-Implementation-Plan.jpg" alt="Review Implementation Plan" style="width: 100%; height: 200px; object-fit: cover;">
    <div style="padding: 1rem;">
      <h3>Review Implementation Plan</h3>
      <p>We ensure your improvement roadmap is practical, measurable, and aligned with business priorities.</p>
    </div>
  </div>

  <div style="border: 1px solid #ddd; border-radius: 12px; overflow: hidden; background: #fff; transition: transform 0.3s, box-shadow 0.3s;">
    <img src="https://agilenlite-web-images.s3.ap-southeast-1.amazonaws.com/Consulting-IT+and+Security+Risk+Assessment/5.+Recommend-Tools-n-Processes.jpg" alt="Recommend Tools and Processes" style="width: 100%; height: 200px; object-fit: cover;">
    <div style="padding: 1rem;">
      <h3>Recommend Tools and Processes</h3>
      <p>We advise on fit-for-purpose technologies and governance processes to support continuous security improvement.</p>
    </div>
  </div>

</div>

<h2>Why AgilenLite Stands Out</h2>
<p>We deliver <strong>clarity, action, and confidence</strong>. Our assessments go beyond compliance checklists — we translate complex risks into <strong>business-focused insights</strong> and <strong>achievable outcomes</strong>. With deep domain expertise and an agile mindset, we help organisations stay <strong>Secure Today and Agile Tomorrow</strong>.</p>`,
    consultantType: "technical_consultant",
    featured: true,
    seoTitle: "IT and Security Risk Assessment | AgilenLite",
    seoDescription: "Comprehensive IT and security risk assessment services to evaluate your security posture and identify improvement opportunities.",
    keywords: "IT security, risk assessment, security posture, compliance, cybersecurity"
  },
  {
    title: "Job Redesign Consulting",
    slug: "job-redesign-consulting",
    description: "Job Redesign Consulting helps organizations optimize their workforce structure and job roles to improve efficiency, employee satisfaction, and business outcomes.",
    content: `<h2>Our Job Redesign Approach</h2>

<p>Job redesign is a strategic process that involves restructuring job roles, responsibilities, and workflows to better align with organizational goals and employee capabilities. Our comprehensive approach ensures that job redesign initiatives deliver measurable improvements in productivity, employee engagement, and business performance.</p>

<h3>Key Benefits of Job Redesign</h3>
<ul>
  <li><strong>Improved Efficiency:</strong> Streamlined workflows and optimized resource allocation</li>
  <li><strong>Enhanced Employee Satisfaction:</strong> Better role clarity and skill utilization</li>
  <li><strong>Increased Productivity:</strong> Reduced bottlenecks and improved collaboration</li>
  <li><strong>Cost Optimization:</strong> Better alignment of roles with business needs</li>
  <li><strong>Career Development:</strong> Clearer career paths and growth opportunities</li>
</ul>

<h2>Our Methodology</h2>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 2rem 0;">

  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 1.5rem; background: #fff;">
    <h3>Assessment & Analysis</h3>
    <p>We conduct thorough analysis of current job structures, workflows, and performance metrics to identify improvement opportunities.</p>
  </div>

  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 1.5rem; background: #fff;">
    <h3>Stakeholder Engagement</h3>
    <p>We work closely with managers, employees, and HR teams to understand requirements and gather input for effective redesign.</p>
  </div>

  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 1.5rem; background: #fff;">
    <h3>Design & Planning</h3>
    <p>We develop detailed redesign plans that optimize job roles, responsibilities, and reporting structures.</p>
  </div>

  <div style="border: 1px solid #ddd; border-radius: 12px; padding: 1.5rem; background: #fff;">
    <h3>Implementation Support</h3>
    <p>We provide change management support and training to ensure smooth transition to new job structures.</p>
  </div>

</div>

<h2>Success Stories</h2>
<p>Our job redesign consulting has helped numerous organizations achieve significant improvements in operational efficiency and employee satisfaction. We combine industry best practices with deep understanding of organizational dynamics to deliver sustainable results.</p>`,
    consultantType: "business_consultant",
    featured: true,
    seoTitle: "Job Redesign Consulting | AgilenLite",
    seoDescription: "Expert job redesign consulting services to optimize workforce structure, improve efficiency, and enhance employee satisfaction.",
    keywords: "job redesign, organizational design, workforce optimization, HR consulting, business process improvement"
  }
];

console.log('Consultant data prepared for import:');
console.log(JSON.stringify(consultants, null, 2));

// Note: To import this data into Strapi, you can:
// 1. Use the Strapi Admin Panel to manually create these entries
// 2. Use the REST API with proper authentication
// 3. Use a data import tool

export { consultants };