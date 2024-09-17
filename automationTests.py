from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By

options = Options()
# options.add_argument('--headless')
# options.add_argument('--disable-gpu')
service = ('geckodriver.exe')
web = webdriver.Firefox(options=options)
web.implicitly_wait(5)
web.get("http://localhost:3000/login")

# enter email
WebDriverWait(web,20).until(EC.element_to_be_clickable(("xpath",'//*[@id="form1"]'))).send_keys("jam12esbo121@gmail.com")
time.sleep(2)

# enter password
WebDriverWait(web,20).until(EC.element_to_be_clickable(("xpath",'//*[@id="form2"]'))).send_keys("Kamal@1998*(")
time.sleep(2)

# click login
WebDriverWait(web,20).until(EC.element_to_be_clickable(("xpath",'/html/body/div/div/div/div/div/div/button'))).click()
time.sleep(5)

try:
    WebDriverWait(web,20).until(EC.presence_of_element_located((By.CLASS_NAME,'custom-card')))
    print("Login Successful")
except:
    print("Login Un-Successful")

# ======================== Test Prediction ==================


# enter city
WebDriverWait(web,20).until(EC.element_to_be_clickable(("xpath",'//*[@id="place"]'))).send_keys("Matara")
time.sleep(2)

# enter month
WebDriverWait(web,20).until(EC.element_to_be_clickable(("xpath",'//*[@id="month"]'))).send_keys("3")
time.sleep(2)

# click submit
WebDriverWait(web,20).until(EC.element_to_be_clickable(("xpath",'//*[@id="root"]/div/div/section/form/div/div[3]/button'))).click()
time.sleep(5)

# Wait for and locate elements using XPath
value_element = WebDriverWait(web, 20).until(
    EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/section/div/div/div[1]/div/div/div/div[2]/div/span/h5/strong'))
)
temperature_element = WebDriverWait(web, 20).until(
    EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/section/div/div/div[1]/div/div/div/div[2]/div/h6'))
)

# Get the text from the elements
value_text = value_element.text
temperature_text = temperature_element.text

# Define the expected values
expected_value = "5"
expected_temperature = "29°C"

# Check if both match
if value_text == expected_value and temperature_text == expected_temperature:
    print("Prediction success")
else:
    print(f"Prediction failed. Value: {value_text}, Temperature: {temperature_text}")


# ======================== Test Registration ==================


web.get("http://localhost:3000/register")

# Fill Name
WebDriverWait(web,20).until(EC.element_to_be_clickable(("xpath",'//*[@id="form1"]'))).send_keys("sunil")
time.sleep(2)

# Fill Email
WebDriverWait(web,20).until(EC.element_to_be_clickable(("xpath",'//*[@id="form2"]'))).send_keys("tony@gmail.com")
time.sleep(2)

# Fill Password
WebDriverWait(web,20).until(EC.element_to_be_clickable(("xpath",'//*[@id="form3"]'))).send_keys("tony123")
time.sleep(2)

# click submit
WebDriverWait(web,20).until(EC.element_to_be_clickable(("xpath",'//*[@id="root"]/div/div/div/div/div/button'))).click()
time.sleep(5)


login_element = WebDriverWait(web, 20).until(
    EC.presence_of_element_located((By.XPATH, '/html/body/div/div/div/div/div/div/h3'))
)

login_elemnt_value = login_element.text

login_text = "Login"

if login_elemnt_value == login_text:
    print("Registration success")
else:
    print("Registration failed")


web.quit()