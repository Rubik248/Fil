function handleFiles(files) {
    const fileList = document.getElementById('file-list');
    const filterType = document.getElementById('filter-type');
    const sizeLimit = document.getElementById('size-limit');

    fileList.querySelector('tbody').innerHTML = '';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const fileItem = document.createElement('tr');
      const downloadLink = document.createElement('a');

      fileItem.innerHTML = `
        <td>${file.name}</td>
        <td>${file.type || 'Неизвестно'}</td>
        <td>${file.size} байт</td>
        <td></td>
      `;

      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download = file.name;
      downloadLink.textContent = 'Скачать';

      fileItem.querySelector('td:last-child').appendChild(downloadLink);

      fileList.querySelector('tbody').appendChild(fileItem);

      const fileInfo = {
        name: file.name,
        type: file.type || 'Неизвестно',
        size: file.size
      };
      localStorage.setItem(file.name, JSON.stringify(fileInfo));
    }

    filterFiles();
  }

  function filterFiles() {
    const fileList = document.getElementById('file-list');
    const filterType = document.getElementById('filter-type');
    const sizeLimit = document.getElementById('size-limit');

    const files = Object.values(localStorage).map(JSON.parse);

    const filteredFiles = files.filter(file => {
      const sizeCheck = parseInt(sizeLimit.value) ? file.size <= parseInt(sizeLimit.value) : true;
      const typeCheck = filterType.value === 'all' || (filterType.value === 'images' && file.type.startsWith('image/'));

      return sizeCheck && typeCheck;
    });

    fileList.querySelector('tbody').innerHTML = '';

    filteredFiles.forEach(file => {
      const fileItem = document.createElement('tr');
      const downloadLink = document.createElement('a');

      fileItem.innerHTML = `
        <td>${file.name}</td>
        <td>${file.type}</td>
        <td>${file.size} байт</td>
        <td><a href="${URL.createObjectURL(file)}" download="${file.name}">Скачать</a></td>
      `;

      fileList.querySelector('tbody').appendChild(fileItem);
    });
  }

  window.onload = function() {
    filterFiles();
  };