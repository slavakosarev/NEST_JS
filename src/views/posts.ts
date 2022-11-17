import { Posts } from '../api/dto/post.dto';

export const postsTemplate = (posts: Posts[]) => {
  if (posts?.length === 0) {
    return emptyNews();
  }
  let html = '<div class="row">';
  for (const postsItem of posts) {
    const dateCr = postsItem.createdAt
      ? postsItem.createdAt.toLocaleDateString('en-CA')
      : new Date().toLocaleDateString('en-CA');

    html += `
<div id="postId_${postsItem.id}" class="col-lg-6">
<div class="card">
<div class="card-body">
<h5 class="card-title">${postsItem.name}</h5>
<h6 class="card-subtitle mb-2 text-muted">
${postsItem.description}
</h6><h6 class="card-subtitle mb-2 text-muted">
Дата создания: ${dateCr}
</h6>
<p class="card-text">${postsItem.text}</p>
</div>
<div class="card-footer">`;

    if (postsItem.comments !== undefined && postsItem.comments.length > 0) {
      for (const commentsItem of postsItem.comments) {
        const commCr = commentsItem.createdAt
          ? commentsItem.createdAt.toLocaleDateString('en-CA')
          : new Date().toLocaleDateString('en-CA');

        html += `<div id="comment_${commentsItem.id}" class="comment">
        <p class="comments-text">${commentsItem.text}<br>
        <em class="createdAt">${commCr}</em></p>`;
        if (
          commentsItem.attachments !== null &&
          commentsItem.attachments !== undefined
        )
          html += `<p class="comments-attachments">${commentsItem.attachments}</p>`;
        html += `</div>`;
      }
    }

    html += `</div>
</div>
</div>
`;
  }
  html += '</div>';
  return html;
};
const emptyNews = () => {
  return `<h1>Список новостей пуст!</h1>`;
};
