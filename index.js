const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',           
    password: '',           
    database: 'ChatBotTests' 
});

connection.connect(err => {
    if (err) {
        console.error('Ошибка подключения к БД:', err);
    } else {
        console.log('Успешное подключение к MySQL');
    }
});


app.get('/getAllItems', (req, res) => {
    connection.query('SELECT * FROM Items', (err, results) => {
        if (err) return res.json(null);
        res.json(results);
    });
});

app.post('/addItem', (req, res) => {
    const { name, desc } = req.query;

    if (!name || !desc) {
        return res.json(null);
    }

    connection.query('INSERT INTO Items (name, `desc`) VALUES (?, ?)', [name, desc], (err, result) => {
        if (err) return res.json(null);

        connection.query('SELECT * FROM Items WHERE id = ?', [result.insertId], (err2, results) => {
            if (err2) return res.json(null);
            res.json(results[0]);
        });
    });
});

app.post('/deleteItem', (req, res) => {
    const { id } = req.query;

    if (!id || isNaN(id)) {
        return res.json(null);
    }

    connection.query('DELETE FROM Items WHERE id = ?', [id], (err, result) => {
        if (err) return res.json(null);

        if (result.affectedRows === 0) {
            res.json({});
        } else {
            res.json({ success: true });
        }
    });
});

app.post('/updateItem', (req, res) => {
    const { id, name, desc } = req.query;

    if (!id || isNaN(id) || !name || !desc) {
        return res.json(null);
    }

    connection.query('UPDATE Items SET name = ?, `desc` = ? WHERE id = ?', [name, desc, id], (err, result) => {
        if (err) return res.json(null);

        if (result.affectedRows === 0) {
            res.json({});
        } else {
            connection.query('SELECT * FROM Items WHERE id = ?', [id], (err2, results) => {
                if (err2) return res.json(null);
                res.json(results[0]);
            });
        }
    });
});


app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
