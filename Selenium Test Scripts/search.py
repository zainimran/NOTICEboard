# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class Form(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://localhost:8080/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_form(self):
        driver = self.driver
        driver.find_element_by_css_selector("img.addlnf").click()
        driver.find_element_by_name("choice").click()
        driver.find_element_by_name("lostitem").clear()
        driver.find_element_by_name("lostitem").send_keys("Joota")
        driver.find_element_by_name("description").clear()
        driver.find_element_by_name("description").send_keys("At khokha")
        driver.find_element_by_css_selector("#lnfform > input[type=\"submit\"]").click()
        driver.find_element_by_id("fileevent1").clear()
        driver.find_element_by_id("fileevent1").send_keys("C:\\Users\\zaini\\Pictures\\Screenshots\\Screenshot (39).png")
        driver.find_element_by_css_selector("#lnfform > input[type=\"submit\"]").click()
        # Warning: assertTextPresent may require manual changes
        self.assertRegexpMatches(driver.find_element_by_css_selector("BODY").text, r"^[\s\S]*Joota\. At khokha[\s\S]*$")
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
