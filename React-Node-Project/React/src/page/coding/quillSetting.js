import axios from 'axios';

const handleImageUpload = async (file) => {
  const formData = new FormData();
  formData.append('images', file);

  try {
    const response = await axios.post('/api/coding/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.images[0]; // 업로드된 이미지의 URL을 반환
  } catch (error) {
    console.error('이미지 업로드 오류:', error);
    return null;
  }
};

export const imageHandler = async (quillRef) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const imageUrl = await handleImageUpload(file);

    if (imageUrl) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, 'image', imageUrl);
    }
  };
};

// Quill Markdown 설정
export const markdownOptions = {
  tags: {
    h1: {
      pattern: /^#(.*)$/,
      tag: 'h1',
    },
    h2: {
      pattern: /^##(.*)$/,
      tag: 'h2',
    },
    h3: {
      pattern: /^###(.*)$/,
      tag: 'h3',
    },
    h4: {
      pattern: /^####(.*)$/,
      tag: 'h4',
    },
    h5: {
      pattern: /^#####(.*)$/,
      tag: 'h5',
    },
    h6: {
      pattern: /^######(.*)$/,
      tag: 'h6',
    },
    blockquote: {
      pattern: /^>(.*)$/,
      tag: 'blockquote',
    },
    bold: {
      pattern: /\*\*(.*)\*\*/,
      tag: 'strong',
    },
    italic: {
      pattern: /_(.*)_/,
      tag: 'em',
    },
    link: {
      pattern: /\[(.*?)\]\((.*?)\)/,
      tag: 'a',
      attrs: (match) => ({
        href: match[2],
        target: '_blank',
        rel: 'noopener noreferrer',
      }),
    },
    code: {
      pattern: /```(\w+)([\s\S]*?)```/,
      tag: 'pre',
      attrs: (match) => ({
        className: `language-${match[1]}`,
      }),
    },
    ul: {
      pattern: /^(\s*[*]\s.*)+$/m,
      tag: 'ul',
    },
    ol: {
      pattern: /^(\s*\d\.\s.*)+$/m,
      tag: 'ol',
    },
    strikethrough: {
      pattern: /~~(.*)~~/,
      tag: 'del',
    },
    checkbox: {
      pattern: /\[([ x])\](.*)/,
      tag: 'input',
      attrs: (match) => ({
        type: 'checkbox',
        checked: match[1].toLowerCase() === 'x',
        disabled: true,
      }),
    },
  },
};
