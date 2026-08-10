// // @ts-nocheck
// (function () {
//   'use strict';

//   const sections = document.querySelectorAll('[data-faq-section]');

//   if (!sections.length) {
//     return;
//   }

//   sections.forEach(function (section) {
//     const sectionId = section.dataset.faqSection;

//     const faqItems = section.querySelectorAll('[data-faq-item]');

//     faqItems.forEach(function (faqItem) {
//       const faqId = faqItem.dataset.faqItem;

//       const form = faqItem.querySelector('[data-comment-form]');
//       const commentsList = faqItem.querySelector('[data-comments-list]');
//       const message = faqItem.querySelector('[data-comment-message]');

//       if (!form || !commentsList) {
//         return;
//       }

//       const storageKey = `faq-comments-${sectionId}-${faqId}`;

//       function getComments() {
//         try {
//           return JSON.parse(localStorage.getItem(storageKey)) || [];
//         } catch (error) {
//           return [];
//         }
//       }

//       function saveComments(comments) {
//         try {
//           localStorage.setItem(
//             storageKey,
//             JSON.stringify(comments)
//           );
//         } catch (error) {
//           console.error('Unable to save FAQ comment.', error);
//         }
//       }

//       function escapeHTML(value) {
//         const div = document.createElement('div');
//         div.textContent = value;
//         return div.innerHTML;
//       }

//       function renderComments() {
//         const comments = getComments();

//         commentsList.innerHTML = '';

//         if (!comments.length) {
//           return;
//         }

//         comments.forEach(function (comment) {
//           const commentElement = document.createElement('article');

//           commentElement.className = 'faq-comment';

//           commentElement.innerHTML = `
//             <div class="faq-comment__header">
//               <strong class="faq-comment__name">
//                 ${escapeHTML(comment.name)}
//               </strong>

//               <time class="faq-comment__date">
//                 ${escapeHTML(comment.date)}
//               </time>
//             </div>

//             <p class="faq-comment__text">
//               ${escapeHTML(comment.comment)}
//             </p>

//             <button
//               type="button"
//               class="faq-comment__delete"
//               data-delete-comment="${comment.id}"
//             >
//               Delete
//             </button>
//           `;

//           commentsList.appendChild(commentElement);
//         });
//       }

//       form.addEventListener('submit', function (event) {
//         event.preventDefault();

//         const formData = new FormData(form);

//         const name = String(formData.get('name') || '').trim();
//         const commentText = String(
//           formData.get('comment') || ''
//         ).trim();

//         message.textContent = '';

//         if (!name) {
//           message.textContent = 'Please enter your name.';
//           return;
//         }

//         if (!commentText) {
//           message.textContent = 'Please enter a comment.';
//           return;
//         }

//         const comments = getComments();

//         const newComment = {
//           id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
//           name: name,
//           comment: commentText,
//           date: new Date().toLocaleDateString()
//         };

//         comments.unshift(newComment);

//         saveComments(comments);

//         form.reset();

//         message.textContent = 'Your comment has been posted.';

//         renderComments();
//       });

//       commentsList.addEventListener('click', function (event) {
//         const deleteButton = event.target.closest(
//           '[data-delete-comment]'
//         );

//         if (!deleteButton) {
//           return;
//         }

//         const commentId = deleteButton.dataset.deleteComment;

//         const comments = getComments();

//         const updatedComments = comments.filter(function (comment) {
//           return comment.id !== commentId;
//         });

//         saveComments(updatedComments);

//         renderComments();
//       });

//       renderComments();
//     });
//   });
// })();