import numpy as np
import pandas as pd
from sklearn.datasets import load_iris
import json

def get_iris_data():
    """Load and return the Iris dataset with additional metadata"""
    iris = load_iris()
    
    # Create DataFrame
    df = pd.DataFrame(iris.data, columns=iris.feature_names)
    df['species'] = pd.Categorical.from_codes(iris.target, iris.target_names)
    df['species_code'] = iris.target
    
    return df, iris.feature_names, iris.target_names

def get_species_info():
    """Return detailed information about each Iris species"""
    species_info = {
        'setosa': {
            'scientific_name': 'Iris setosa',
            'common_names': ['Bristle-pointed Iris', 'Blue Flag'],
            'characteristics': [
                'Smallest petals among the three species',
                'Most distinct and easily separable',
                'Typically found in cooler climates'
            ],
            'habitat': 'Arctic and subarctic regions, wetlands',
            'medicinal_uses': [
                'Traditional use for treating wounds',
                'Anti-inflammatory properties',
                'Used in folk medicine for skin conditions'
            ],
            'growing_conditions': {
                'soil': 'Moist, well-drained soil',
                'sunlight': 'Full sun to partial shade',
                'temperature': 'Cold hardy, prefers cooler temperatures',
                'water': 'Regular watering, tolerates wet conditions'
            }
        },
        'versicolor': {
            'scientific_name': 'Iris versicolor',
            'common_names': ['Blue Flag Iris', 'Harlequin Blueflag'],
            'characteristics': [
                'Medium-sized petals and sepals',
                'Purple-blue flowers with yellow markings',
                'Most common in temperate regions'
            ],
            'habitat': 'Wetlands, marshes, pond edges',
            'medicinal_uses': [
                'Historically used as a cathartic',
                'Traditional treatment for digestive issues',
                'Used in homeopathic preparations'
            ],
            'growing_conditions': {
                'soil': 'Wet to moist soil, tolerates clay',
                'sunlight': 'Full sun to partial shade',
                'temperature': 'Moderate temperatures, frost tolerant',
                'water': 'Prefers consistently moist to wet conditions'
            }
        },
        'virginica': {
            'scientific_name': 'Iris virginica',
            'common_names': ['Virginia Iris', 'Southern Blue Flag'],
            'characteristics': [
                'Largest petals and sepals',
                'Tall growing with blue to purple flowers',
                'Most variable in measurements'
            ],
            'habitat': 'Wetlands, swamps, coastal areas',
            'medicinal_uses': [
                'Root used in traditional medicine',
                'Anti-inflammatory and antiseptic properties',
                'Historical use for treating rheumatism'
            ],
            'growing_conditions': {
                'soil': 'Moist to wet, acidic soil',
                'sunlight': 'Full sun to partial shade',
                'temperature': 'Warm temperate climates',
                'water': 'High water requirements, bog conditions'
            }
        }
    }
    
    return species_info

def predict_species_from_measurements(sepal_length, sepal_width, petal_length, petal_width):
    """Simple rule-based prediction for demonstration"""
    # These are simplified rules based on the Iris dataset characteristics
    if petal_length < 2.5:
        return 'setosa'
    elif petal_length < 5.0 and petal_width < 1.8:
        return 'versicolor'
    else:
        return 'virginica'

def get_environmental_recommendations(species):
    """Get environmental growing recommendations for a species"""
    species_info = get_species_info()
    
    if species.lower() in species_info:
        return species_info[species.lower()]['growing_conditions']
    else:
        return None

# Save species information to JSON for web app use
if __name__ == "__main__":
    species_info = get_species_info()
    
    with open('iris_species_info.json', 'w') as f:
        json.dump(species_info, f, indent=2)
    
    print("✅ Species information saved to 'iris_species_info.json'")
    
    # Test the utility functions
    df, features, targets = get_iris_data()
    print(f"\n📊 Dataset loaded: {df.shape}")
    print(f"Features: {features}")
    print(f"Species: {targets}")
    
    # Test prediction
    test_prediction = predict_species_from_measurements(5.1, 3.5, 1.4, 0.2)
    print(f"\n🔮 Test prediction: {test_prediction}")
    
    # Test environmental recommendations
    recommendations = get_environmental_recommendations('setosa')
    print(f"\n🌱 Growing conditions for setosa:")
    for key, value in recommendations.items():
        print(f"  {key}: {value}")
