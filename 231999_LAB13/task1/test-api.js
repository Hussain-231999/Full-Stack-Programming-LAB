/**
 * Simple API testing script
 * Tests various API endpoints with different cities
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

/**
 * Test a single API endpoint
 */
async function testEndpoint(description, url) {
  console.log(`\n${colors.cyan}Testing: ${description}${colors.reset}`);
  console.log(`URL: ${url}`);
  
  try {
    const response = await axios.get(url);
    console.log(`${colors.green}✓ Success${colors.reset}`);
    console.log(JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.log(`${colors.red}✗ Error${colors.reset}`);
    if (error.response) {
      console.log(JSON.stringify(error.response.data, null, 2));
    } else {
      console.log(error.message);
    }
    return false;
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log(`${colors.blue}================================================${colors.reset}`);
  console.log(`${colors.blue}  Weather API Test Suite${colors.reset}`);
  console.log(`${colors.blue}================================================${colors.reset}`);

  let passed = 0;
  let failed = 0;

  // Test 1: Root endpoint
  const test1 = await testEndpoint(
    'Root Endpoint (API Documentation)',
    `${BASE_URL}/`
  );
  test1 ? passed++ : failed++;

  // Test 2: Valid city (path parameter)
  const test2 = await testEndpoint(
    'Valid City - London (Path Parameter)',
    `${BASE_URL}/api/weather/London`
  );
  test2 ? passed++ : failed++;

  // Test 3: Valid city (query parameter)
  const test3 = await testEndpoint(
    'Valid City - Paris (Query Parameter)',
    `${BASE_URL}/api/weather?city=Paris`
  );
  test3 ? passed++ : failed++;

  // Test 4: Another valid city
  const test4 = await testEndpoint(
    'Valid City - Tokyo',
    `${BASE_URL}/api/weather/Tokyo`
  );
  test4 ? passed++ : failed++;

  // Test 5: City with spaces
  const test5 = await testEndpoint(
    'City with Spaces - New York',
    `${BASE_URL}/api/weather/New%20York`
  );
  test5 ? passed++ : failed++;

  // Test 6: Invalid city (should fail)
  const test6 = await testEndpoint(
    'Invalid City (Expected to Fail)',
    `${BASE_URL}/api/weather/InvalidCityName12345`
  );
  !test6 ? passed++ : failed++; // This should fail

  // Test 7: Empty city name (should fail)
  const test7 = await testEndpoint(
    'Empty City Name (Expected to Fail)',
    `${BASE_URL}/api/weather/`
  );

  // Summary
  console.log(`\n${colors.blue}================================================${colors.reset}`);
  console.log(`${colors.blue}  Test Summary${colors.reset}`);
  console.log(`${colors.blue}================================================${colors.reset}`);
  console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
  console.log(`${colors.blue}================================================${colors.reset}\n`);
}

// Check if server is running
async function checkServer() {
  try {
    await axios.get(BASE_URL);
    return true;
  } catch (error) {
    return false;
  }
}

// Main execution
(async () => {
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.error(`${colors.red}❌ Server is not running!${colors.reset}`);
    console.log(`${colors.yellow}Please start the server first:${colors.reset}`);
    console.log(`   npm start`);
    process.exit(1);
  }

  await runTests();
})();
