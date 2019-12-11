import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib
import sys

# Simple Linear Regression
def train_model(data_set_path):

    # Importing the dataset
    dataset = pd.read_csv(data_set_path)
    X = dataset.iloc[:, :-1].values
    y = dataset.iloc[:, 1].values

    # Splitting the dataset into the Training set and Test set
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 1/3, random_state = 0)

    # Fitting Simple Linear Regression to the Training set
    regressor = LinearRegression()
    regressor.fit(X_train, y_train)

    filename = '../REST-API/model2.sav'
    joblib.dump(regressor, filename)
    loaded_model = joblib.load(filename)
    result = loaded_model.predict([X_test[0]])
    print(result)

    # Predicting the Test set results
    # y_pred = regressor.predict(X_test)

    # Visualising the Training set results
    # plt.scatter(X_train, y_train, color = 'red')
    # plt.plot(X_train, regressor.predict(X_train), color = 'blue')
    # plt.title('Salary vs Experience (Training set)')
    # plt.xlabel('Years of Experience')
    # plt.ylabel('Salary')
    # plt.show()

    # # Visualising the Test set results
    # plt.scatter(X_test, y_test, color = 'red')
    # plt.plot(X_train, regressor.predict(X_train), color = 'blue')
    # plt.title('Salary vs Experience (Test set)')
    # plt.xlabel('Years of Experience')
    # plt.ylabel('Salary')
    # plt.show()

if __name__ == "__main__":
   train_model(sys.argv[1])