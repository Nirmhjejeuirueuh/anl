---
enable: true # Control the visibility of this section across all pages where it is used

infoBlock:
  enable: true
  content: |
    Our team of seasoned consultants provides actionable insights and innovative strategies to help your business thrive in today's competitive landscape

  video:
    src: "rFVpSwgCkCo" # Locally hosted video path (ex: /videos/test-video.mp4), or a YouTube/Vimeo video ID (ex: youtube id - , vimeo id - 1003013057)
    type: "" # If video is stored locally in `public/videos`, set to video file type (e.g., "video/mp4")
    provider: "youtube" # Options: "youtube", "vimeo", or "html5"
    poster: "/images/video-thumbnail.jpg" # Path to thumbnail image for the video
    autoplay: true # Set to true to autoplay; false for manual start (default: false)
    id: "banner-video"

mainBlock:
  disableSlider: false # if this is true then slider will be disabled and only first slide from below will be shown
  slides:
    - title: "Empowering Your <br /> Digital Transformation"
      description: "We partner with organisations to embrace the evolving technological landscape; inspire individuals with know-how to stay abreast of the changing trends."
      backgroundImage: "/images/banner.jpg" 
      button:
        enable: true
        label: "Our Services"
        url: "/services"
        rel: ""
        target: ""
        showIcon: "true"
        variant: "outline-white" # "fill", "outline", "outline-white", "text"
        hoverEffect: "text-flip" # "text-flip", "creative-fill", "magnetic", "magnetic-text-flip"
---
