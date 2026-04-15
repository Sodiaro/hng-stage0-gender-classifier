const test = require('node:test');
const assert = require('node:assert');
const app = require('./index.js');

test('Validation: Missing name returns 400', async (t) => {
    const server = app.listen(0);
    const { port } = server.address();
    
    try {
        const res = await fetch(`http://localhost:${port}/api/classify`);
        const body = await res.json();
        
        assert.strictEqual(res.status, 400);
        assert.strictEqual(body.status, 'error');
        assert.strictEqual(body.message, 'Missing or empty name query parameter');
    } finally {
        server.close();
    }
});

test('Validation: Non-string name returns 422', async (t) => {
    const server = app.listen(0);
    const { port } = server.address();
    
    try {
        const res = await fetch(`http://localhost:${port}/api/classify?name=a&name=b`);
        const body = await res.json();
        
        assert.strictEqual(res.status, 422);
        assert.strictEqual(body.status, 'error');
        assert.strictEqual(body.message, 'Non-string name query parameter');
    } finally {
        server.close();
    }
});

test('Success: Valid name returns 200 and correct structure', async (t) => {
    const server = app.listen(0);
    const { port } = server.address();
    
    try {
        const res = await fetch(`http://localhost:${port}/api/classify?name=peter`);
        const body = await res.json();
        
        assert.strictEqual(res.status, 200);
        assert.strictEqual(body.status, 'success');
        assert.ok(body.data.name);
        assert.ok(body.data.gender);
        assert.ok(typeof body.data.sample_size === 'number');
        assert.ok(typeof body.data.is_confident === 'boolean');
        assert.ok(body.data.processed_at);
    } finally {
        server.close();
    }
});
