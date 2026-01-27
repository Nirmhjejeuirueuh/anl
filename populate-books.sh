# Populate Books in Strapi CMS
# Run these curl commands to add the books

# First book: The Art of Cyber Resilience
curl -X POST http://localhost:1337/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "The Art of Cyber Resilience: Into the Mind of Cyber Criminals Kindle Edition",
      "description": "Never before has cybersecurity been more important to us. We live in the digital era where the internet, digital, online, remote, and virtual interactions have become a way of life. We cannot escape being victims of cyber attacks as we embrace the digital lifestyle and forge forward with digital transformation. Understanding and being aware of cyber threats and having good cyber hygiene is a survival life kit we need to equip ourselves. Most importantly, we have to be armed with cyber resiliency to respond to and recover from cyber incidents when they happen in our lives. This book takes you through the fundamentals of cyber attacks, highlights the warning signs of cyber incidents, and provides pointers on cultivating good hygiene and adopting good cyber resilience. The book is easy to digest, uses minimal technical jargon and incorporates several real-life cases relatable to readers.",
      "author": "Amelia Ching",
      "pages": 206,
      "publishedDate": "March 31, 2022",
      "buttonText": "Get Your Copy",
      "buttonLink": "https://www.amazon.com/dp/B09X1Y4JG6"
    }
  }'

echo ""

# Second book: Outsmart the Insider
curl -X POST http://localhost:1337/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Outsmart the Insider: Building A Zero-Trust Ecosystem",
      "description": "Until today, there is no foolproof solution to address the cyber security risks arising from human threats. While it'\''s easy to implement technical solutions to switch a mechanism on or off to block or remove a threat, it is not possible to totally do the same against human actions or behaviour. The majority of cyber attacks start with successful entry to the target environment or access to confidential and personal information by exploiting human weakness, also known as vulnerabilities, contributed by human factors. This eBook explains insider threats, the weakest link in an organisation'\''s cyber security ecosystem, and outline the measures required to safeguard, combat, and recover from the related cyber risks.",
      "author": "Amelia Ching",
      "pages": 45,
      "publishedDate": "August 5, 2024",
      "buttonText": "Get Your Copy",
      "buttonLink": "#"
    }
  }'

echo ""
echo "Books populated successfully! 🎉"
echo "Make sure to:"
echo "1. Start Strapi: cd anl-cms && npm run develop"
echo "2. Run this script: chmod +x populate-books.sh && ./populate-books.sh"
echo "3. Publish the books in Strapi admin panel"
echo "4. Add images to the books in Strapi"