import pandas as pd
from sklearn.model_selection import train_test_split
from autogluon.tabular import TabularPredictor

data = pd.read_csv('DatasetForClo.csv')

# Split the data into training and validation sets
X = data[['favorite_color', 'skin_tone', 'interest_style']]
y_primary = data['primary_color']
y_secondary = data['secondary_color']

X_train, X_val, y_train_primary, y_val_primary, y_train_secondary, y_val_secondary = train_test_split(
    X, y_primary, y_secondary, test_size=0.86
)

# Train the model for predicting primary_color
train_data_primary = pd.concat([X_train, y_train_primary], axis=1)
predictor_primary = TabularPredictor(label='primary_color')
predictor_primary.fit(train_data_primary)

# Train the model for predicting secondary_color
train_data_secondary = pd.concat([X_train, y_train_secondary], axis=1)
predictor_secondary = TabularPredictor(label='secondary_color')
predictor_secondary.fit(train_data_secondary)   

predictor_primary.save('primary-color')
predictor_secondary.save('secondary-color')
