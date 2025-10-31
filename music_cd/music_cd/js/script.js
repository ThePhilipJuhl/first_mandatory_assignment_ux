'use strict';

const API_BASE_URL = 'http://localhost:3000';

const rowTemplate = () => {
    const trTemplate = document.createElement('tr');

    const tdAuthor = document.createElement('td');
    const tdTitle = document.createElement('td');
    const tdYear = document.createElement('td');
    tdYear.classList.add('right');
    
    const imgDelete = document.createElement('img');
    imgDelete.classList.add('delete');
    const tdDelete = document.createElement('td');
    tdDelete.appendChild(imgDelete);
    tdDelete.classList.add('right');
    
    trTemplate.appendChild(tdAuthor);
    trTemplate.appendChild(tdTitle);
    trTemplate.appendChild(tdYear);
    trTemplate.appendChild(tdDelete);

    return trTemplate;
}
const tableRowTemplate = rowTemplate();

function renderRow(cd) {
    const trNew = tableRowTemplate.cloneNode(true);
    trNew.dataset.id = cd.id;
    trNew.querySelector('td:nth-of-type(1)').innerText = cd.author;
    trNew.querySelector('td:nth-of-type(2)').innerText = cd.title;
    trNew.querySelector('td:nth-of-type(3)').innerText = cd.year;
    trNew.querySelector('img').addEventListener('click', async function() {
        const tr = this.closest('tr');
        const id = tr.dataset.id;
        try {
            await fetch(`${API_BASE_URL}/music/${id}`, { method: 'DELETE' });
            tr.remove();
        } catch (err) {
            console.error('Failed to delete CD:', err);
        }
    });
    document.querySelector('table > tbody').appendChild(trNew);
}

async function loadAll() {
    try {
        const res = await fetch(`${API_BASE_URL}/music`);
        const list = await res.json();
        document.querySelector('table > tbody').innerHTML = '';
        list.forEach(renderRow);
        if (list.length > 0) {
            document.querySelector('table').classList.add('visible');
        }
    } catch (err) {
        console.error('Failed to load CDs:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadAll);

document.querySelector('#frmCD').addEventListener('submit', async function(e) {
    e.preventDefault();

    const author = e.target.txtAuthor.value;
    const title = e.target.txtTitle.value;
    const year = parseInt(e.target.txtYear.value);

    try {
        const res = await fetch(`${API_BASE_URL}/music`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author, title, year })
        });
        const saved = await res.json();
        renderRow(saved);
        document.querySelector('table').classList.add('visible');
        this.reset();
    } catch (err) {
        console.error('Failed to save CD:', err);
    }
});