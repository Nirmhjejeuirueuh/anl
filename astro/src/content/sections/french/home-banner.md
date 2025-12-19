---
enable: true # Contrôler la visibilité de cette section sur toutes les pages où elle est utilisée

infoBlock:
  enable: true
  content: |
    Notre équipe de consultants expérimentés fournit des idées pratiques et des stratégies innovantes pour aider votre entreprise à prospérer dans un environnement concurrentiel.

  video:
    src: "rFVpSwgCkCo" # Chemin de la vidéo hébergée localement (ex. : /videos/test-video.mp4), ou identifiant de vidéo YouTube/Vimeo (ex. : identifiant YouTube - , identifiant Vimeo - 1003013057)
    type: "" # Si la vidéo est stockée localement dans `public/videos`, définissez le type de fichier vidéo (ex. : "video/mp4")
    provider: "youtube" # Options : "youtube", "vimeo", ou "html5"
    poster: "/images/video-thumbnail.jpg" # Chemin de l'image miniature pour la vidéo
    autoplay: true # Mettre sur true pour lecture automatique ; false pour démarrage manuel (par défaut : false)
    id: "banner-video"

mainBlock:
  disableSlider: false # if this is true then slider will be disabled and only first slide from below will be shown
  slides:
    - title: "Solutions innovantes pour un succès durable"
      description: "Collaborez avec nous pour des solutions personnalisées qui améliorent vos <br/> performances d'entreprise et assurent un succès à long terme."
      backgroundImage: "/images/hero/1.webp"
      button:
        enable: true
        label: "Demander une consultation"
        url: "/contact"
        rel: ""
        target: ""
        showIcon: "true"
        variant: "outline-white" # "fill", "outline", "outline-white", "text"
        hoverEffect: "text-flip" # "text-flip", "creative-fill", "magnetic", "magnetic-text-flip"
    - title: "Programmes de **formation complets**"
      description: "Améliorez vos compétences avec nos cours dirigés par des experts en Agile, DevOps, cybersécurité et transformation numérique."
      backgroundImage: "/images/hero/2.webp"
      button:
        enable: true
        label: "Voir nos cours"
        url: "/courses/"
        rel: ""
        target: ""
        showIcon: "true"
        variant: "outline-white"
        hoverEffect: "text-flip"
    - title: "Explorez notre **galerie média**"
      description: "Découvrez nos programmes d'entreprise, sessions de formation, événements spéciaux et contenu de leadership éclairé."
      backgroundImage: "/images/hero/3.webp"
      button:
        enable: true
        label: "Parcourir la galerie"
        url: "/gallery/"
        rel: ""
        target: ""
        showIcon: "true"
        variant: "outline-white"
        hoverEffect: "text-flip"
    - title: "En savoir plus **sur nous**"
      description: "Découvrez notre mission, nos valeurs et l'équipe d'experts dédiée à votre succès en transformation numérique."
      backgroundImage: "/images/hero/4.webp"
      button:
        enable: true
        label: "À propos d'Agilenlite"
        url: "/about/"
        rel: ""
        target: ""
        showIcon: "true"
        variant: "outline-white"
        hoverEffect: "text-flip"
    - title: "**Contactez-nous** dès aujourd'hui"
      description: "Prêt à transformer votre organisation ? Contactez nos experts pour des solutions personnalisées."
      backgroundImage: "/images/hero/5.webp"
      button:
        enable: true
        label: "Nous contacter"
        url: "/contact/"
        rel: ""
        target: ""
        showIcon: "true"
        variant: "outline-white"
        hoverEffect: "text-flip"
---
