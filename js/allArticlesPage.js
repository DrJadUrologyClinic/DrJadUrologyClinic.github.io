document.addEventListener('DOMContentLoaded', function() {
  const articles = [
      {
          title: "المقال الأول",
          description: "هذه وصف مختصر للمقال الأول.",
          link: "#"
      },
      {
          title: "المقال الثاني",
          description: "هذه وصف مختصر للمقال الثاني.",
          link: "#"
      },
      {
          title: "المقال الثالث",
          description: "هذه وصف مختصر للمقال الثالث.",
          link: "#"
      },
      {
          title: "المقال الرابع",
          description: "هذه وصف مختصر للمقال الرابع.",
          link: "#"
      },
      {
          title: "المقال الخامس",
          description: "هذه وصف مختصر للمقال الخامس.",
          link: "#"
      },
      // أضف المزيد من المقالات حسب الحاجة
  ];

  const articleList = document.getElementById('article-list');

  articles.forEach(article => {
      const articleCard = document.createElement('div');
      articleCard.classList.add('article-card');

      const articleTitle = document.createElement('h2');
      articleTitle.textContent = article.title;

      const articleDescription = document.createElement('p');
      articleDescription.textContent = article.description;

      const articleLink = document.createElement('a');
      articleLink.href = article.link;
      articleLink.textContent = "اقرأ المزيد";

      articleCard.appendChild(articleTitle);
      articleCard.appendChild(articleDescription);
      articleCard.appendChild(articleLink);

      articleList.appendChild(articleCard);
  });
});
