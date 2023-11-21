import csv
import os
###############################
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time
######Declaring Web Driver#####
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
######Folder Name and Making Data#####
FOLDER_NAME = 'weather_data'
CITY = 'lahore'
YEAR_LOWER_LIMIT = 2019
YEAR_UPPER_LIMIT = 2023

try:
    os.mkdir(FOLDER_NAME)
except:
    print(FOLDER_NAME + " already exists")
    
def getFileName():
    FileTitle = driver.find_element(By.ID, 'wt-his-title').text
    partsOfText = FileTitle.split(' ')
    del partsOfText[-3] #Excluding the Day
    fileName = ""
    for e in partsOfText:
        fileName = fileName + e
    return fileName

def getFilePath():
    fileName = getFileName()+'.csv'
    return FOLDER_NAME + '/' + fileName

def saveMonthlyData(MonthlyData):
    with open(getFilePath(), 'w', newline='') as file:
        writer = csv.writer(file)
        #File Header#
        writer.writerow(["Date", "Time", "Temperature", "Weather", "Wind", "Humidity", "Barometer", "Visibility"])
        for i in range(0, len(MonthlyData)):
            for j in range(0, len(MonthlyData[i])):
                writer.writerow(MonthlyData[i][j])
        file.close()
            

def getMonthData():
    if(os.path.exists(getFilePath())):
        print(getFilePath() + " already exists")
        raise Exception("Sorry, Monthly data is already available")
    dayLinks = getDaysLinks(driver)
    WeatherData = []
    for i in range(0, len(dayLinks)):
        WeatherData.append(getDayData(dayLinks[i]))
    return WeatherData
        

def getDaysLinks(webDriver):
    # find an element on the page and get its text content
    weatherLinks = driver.find_elements(By.CLASS_NAME, 'weatherLinks')[1]
    weatherLinksList = weatherLinks.find_elements(By.TAG_NAME, 'a')
    return weatherLinksList
    
def getDayData(dayLink):
    dayLink.click()
    time.sleep(2)
    return getTableData()

def getDate():
    dateText = driver.find_element(By.ID, 'wt-his-title').text
    partsOfText = dateText.split(' ')
    day = partsOfText[len(partsOfText)-3]
    month = partsOfText[len(partsOfText)-2]
    year = partsOfText[len(partsOfText)-1]
    date = day + " " + month + " " + year
    return date
    

def getTableData():
    ########################################
    date = getDate()
    ########################################
    table = driver.find_element(By.ID, 'wt-his')
    rowsList = table.find_element(By.TAG_NAME, 'tbody').find_elements(By.TAG_NAME, 'tr')
    ######################################
    tableData = []
    
    for i in range(0, len(rowsList)):
        fetchedRow = []
        fetchedRow.append(date)
        fetchedRow = getRowData(fetchedRow, rowsList[i])
        tableData.append(fetchedRow)
    return tableData

def getRowData(fetchedRow, rowElement):
    ####Adding Time####
    fetchedRow.append(rowElement.find_element(By.TAG_NAME, 'th').text.split('\n')[0])
    tdList = rowElement.find_elements(By.TAG_NAME, 'td')
    ####Adding Temperature####
    fetchedRow.append(tdList[1].text)
    ####Adding Weather####
    fetchedRow.append(tdList[2].text)
    ####Adding Wind####
    fetchedRow.append(tdList[3].text)
    ####Adding Humidity####
    fetchedRow.append(tdList[5].text)
    ####Adding Barometer####
    fetchedRow.append(tdList[6].text)
    ####Adding Visibility####
    fetchedRow.append(tdList[7].text)
    return fetchedRow

# navigate to the website you want to scrape
for i in range(YEAR_LOWER_LIMIT, YEAR_UPPER_LIMIT+1):
    for j in range (1, 13):
        try:
            driver.get("https://www.timeanddate.com/weather/pakistan/"+CITY+"/historic?month="+str(j)+"&year="+str(i))
            data = getMonthData()
            saveMonthlyData(data)
        except:
            print("Error While Fetching " + str(j) + "-" + str(i))

# close the browser
driver.quit()
