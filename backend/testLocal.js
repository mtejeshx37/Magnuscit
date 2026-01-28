/**
 * Local Test Script
 * Tests the serverless API handlers locally
 * 
 * Usage: node testLocal.js
 */

const registrationHandler = require('../api/registrations');
const bulkSendHandler = require('../api/bulk-send');

// Mock request/response objects
const createMockRequest = (method, body = {}) => ({
  method,
  body,
  headers: {
    'content-type': 'application/json'
  }
});

const createMockResponse = () => {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    
    status(code) {
      this.statusCode = code;
      return this;
    },
    
    setHeader(key, value) {
      this.headers[key] = value;
      return this;
    },
    
    json(data) {
      this.body = data;
      console.log('\n📤 Response:', JSON.stringify(data, null, 2));
      return this;
    },
    
    end() {
      console.log('✅ Response ended');
      return this;
    }
  };
  
  return res;
};

// Test 1: Register a new user
async function testRegistration() {
  console.log('\n🧪 TEST 1: Register New User');
  console.log('═'.repeat(50));
  
  const req = createMockRequest('POST', {
    name: 'Test User',
    email: 'test@example.com',
    eventName: 'Hackathon',
    eventDate: 'February 2nd, 2026'
  });
  
  const res = createMockResponse();
  
  try {
    await registrationHandler(req, res);
    
    if (res.statusCode === 201 && res.body.success) {
      console.log('✅ Registration test PASSED');
      return res.body.data.id; // Return user ID for bulk test
    } else {
      console.log('❌ Registration test FAILED');
      return null;
    }
  } catch (error) {
    console.error('❌ Registration test ERROR:', error.message);
    return null;
  }
}

// Test 2: Bulk send emails
async function testBulkSend() {
  console.log('\n🧪 TEST 2: Bulk Send Emails');
  console.log('═'.repeat(50));
  
  const req = createMockRequest('POST');
  const res = createMockResponse();
  
  try {
    await bulkSendHandler(req, res);
    
    if (res.statusCode === 200 && res.body.success) {
      console.log('✅ Bulk send test PASSED');
    } else {
      console.log('❌ Bulk send test FAILED');
    }
  } catch (error) {
    console.error('❌ Bulk send test ERROR:', error.message);
  }
}

// Test 3: Invalid method
async function testInvalidMethod() {
  console.log('\n🧪 TEST 3: Invalid Method (GET)');
  console.log('═'.repeat(50));
  
  const req = createMockRequest('GET');
  const res = createMockResponse();
  
  try {
    await registrationHandler(req, res);
    
    if (res.statusCode === 405) {
      console.log('✅ Invalid method test PASSED (405 returned)');
    } else {
      console.log('❌ Invalid method test FAILED');
    }
  } catch (error) {
    console.error('❌ Invalid method test ERROR:', error.message);
  }
}

// Test 4: Missing required fields
async function testMissingFields() {
  console.log('\n🧪 TEST 4: Missing Required Fields');
  console.log('═'.repeat(50));
  
  const req = createMockRequest('POST', {
    name: 'Test User'
    // Missing email
  });
  
  const res = createMockResponse();
  
  try {
    await registrationHandler(req, res);
    
    if (res.statusCode === 400) {
      console.log('✅ Missing fields test PASSED (400 returned)');
    } else {
      console.log('❌ Missing fields test FAILED');
    }
  } catch (error) {
    console.error('❌ Missing fields test ERROR:', error.message);
  }
}

// Run all tests
async function runAllTests() {
  console.log('\n🚀 Starting Serverless API Tests');
  console.log('═'.repeat(50));
  console.log('Make sure .env is configured with:');
  console.log('  - MONGO_URI');
  console.log('  - EMAIL_USER');
  console.log('  - EMAIL_PASS');
  console.log('═'.repeat(50));
  
  try {
    await testInvalidMethod();
    await testMissingFields();
    await testRegistration();
    
    // Wait 2 seconds before bulk send
    console.log('\n⏳ Waiting 2 seconds before bulk send test...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await testBulkSend();
    
    console.log('\n' + '═'.repeat(50));
    console.log('✅ All tests completed!');
    console.log('═'.repeat(50));
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
  }
  
  process.exit(0);
}

// Run tests
runAllTests();
