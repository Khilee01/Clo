import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def calculate_cosine_similarity_and_index(user_input):
    file_path = r"recommend_primary_secondary.csv"
    dataset = np.genfromtxt(file_path, delimiter=",")
    dataset = dataset[1:]
    X_from_predefined_dataset = dataset[:, :7]

    # Calculate cosine similarities
    cosine_similarities = cosine_similarity(
        X_from_predefined_dataset, user_input.reshape(1, -1)
    )

    # Find the index of the maximum similarity
    max_similarity_index = np.argmax(cosine_similarities)

    # Return the cosine similarities and the index of the max similarity
    return dataset[max_similarity_index, 7:10], dataset[max_similarity_index, 10:]

def compare_to_colors(unit):
    if unit == [255,255,255]:
        return 'White'
    elif unit == [0, 0, 0]:
        return 'Black'
    elif unit == [220,20,60]:
        return 'Crimson'
    elif unit == [255,255,244]:
        return 'Off-White'
    elif unit == [212,246,221]:
        return 'Lime Green'
    elif unit == [203,195,227]:
        return 'Light Purple'
    elif unit == [0,0,128]:
        return 'Navy Blue'
    elif unit == [255,165,0]:
        return 'Orange'
    elif unit == [255,255,0]:
        return 'Yellow'

def calculateFinalOutput(X):
    primary, secondary = calculate_cosine_similarity_and_index(X)
    primary = compare_to_colors(primary)
    secondary = compare_to_colors(secondary)
    return primary, secondary