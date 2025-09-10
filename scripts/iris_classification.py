import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, confusion_matrix, classification_report
import warnings
warnings.filterwarnings('ignore')

print("🌸 Iris Flower Classification System")
print("=" * 50)

# Load the Iris dataset
print("\n📊 Loading Iris Dataset...")
iris = load_iris()
X = iris.data
y = iris.target
feature_names = iris.feature_names
target_names = iris.target_names

# Create DataFrame for easier manipulation
df = pd.DataFrame(X, columns=feature_names)
df['species'] = pd.Categorical.from_codes(y, target_names)

print(f"Dataset shape: {df.shape}")
print(f"Features: {list(feature_names)}")
print(f"Species: {list(target_names)}")

# Basic statistics
print("\n📈 Dataset Overview:")
print(df.describe())

print("\n🔍 Species Distribution:")
print(df['species'].value_counts())

# Exploratory Data Analysis
print("\n🎨 Generating EDA Visualizations...")

# Set up the plotting style
plt.style.use('default')
sns.set_palette("husl")

# 1. Pair Plot
plt.figure(figsize=(12, 10))
sns.pairplot(df, hue='species', diag_kind='hist', markers=['o', 's', 'D'])
plt.suptitle('Iris Dataset - Pair Plot', y=1.02, fontsize=16)
plt.tight_layout()
plt.savefig('iris_pairplot.png', dpi=300, bbox_inches='tight')
print("✅ Pair plot saved as 'iris_pairplot.png'")

# 2. Correlation Heatmap
plt.figure(figsize=(10, 8))
correlation_matrix = df.iloc[:, :-1].corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0, 
            square=True, linewidths=0.5)
plt.title('Feature Correlation Heatmap', fontsize=16, pad=20)
plt.tight_layout()
plt.savefig('iris_correlation.png', dpi=300, bbox_inches='tight')
print("✅ Correlation heatmap saved as 'iris_correlation.png'")

# 3. Distribution plots
fig, axes = plt.subplots(2, 2, figsize=(15, 12))
features = feature_names
for i, feature in enumerate(features):
    row, col = i // 2, i % 2
    sns.histplot(data=df, x=feature, hue='species', kde=True, ax=axes[row, col])
    axes[row, col].set_title(f'Distribution of {feature}', fontsize=12)
    axes[row, col].grid(True, alpha=0.3)

plt.suptitle('Feature Distributions by Species', fontsize=16)
plt.tight_layout()
plt.savefig('iris_distributions.png', dpi=300, bbox_inches='tight')
print("✅ Distribution plots saved as 'iris_distributions.png'")

# 4. Box plots
plt.figure(figsize=(15, 10))
for i, feature in enumerate(features):
    plt.subplot(2, 2, i+1)
    sns.boxplot(data=df, x='species', y=feature)
    plt.title(f'{feature} by Species')
    plt.xticks(rotation=45)
    plt.grid(True, alpha=0.3)

plt.suptitle('Box Plots - Feature Comparison by Species', fontsize=16)
plt.tight_layout()
plt.savefig('iris_boxplots.png', dpi=300, bbox_inches='tight')
print("✅ Box plots saved as 'iris_boxplots.png'")

# Split the data
print("\n🔄 Splitting Data...")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)
print(f"Training set: {X_train.shape[0]} samples")
print(f"Test set: {X_test.shape[0]} samples")

# Train multiple models
print("\n🤖 Training Classification Models...")

models = {
    'Logistic Regression': LogisticRegression(random_state=42, max_iter=200),
    'K-Nearest Neighbors': KNeighborsClassifier(n_neighbors=5),
    'Decision Tree': DecisionTreeClassifier(random_state=42, max_depth=5)
}

results = {}

for name, model in models.items():
    print(f"\n🔧 Training {name}...")
    
    # Train the model
    model.fit(X_train, y_train)
    
    # Make predictions
    y_pred = model.predict(X_test)
    
    # Calculate metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted')
    recall = recall_score(y_test, y_pred, average='weighted')
    
    results[name] = {
        'model': model,
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'predictions': y_pred
    }
    
    print(f"✅ {name} Results:")
    print(f"   Accuracy: {accuracy:.4f}")
    print(f"   Precision: {precision:.4f}")
    print(f"   Recall: {recall:.4f}")

# Find best model
best_model_name = max(results.keys(), key=lambda k: results[k]['accuracy'])
best_model = results[best_model_name]

print(f"\n🏆 Best Model: {best_model_name}")
print(f"Best Accuracy: {best_model['accuracy']:.4f}")

# Detailed evaluation of best model
print(f"\n📊 Detailed Evaluation - {best_model_name}")
print("=" * 40)

# Classification report
print("\nClassification Report:")
print(classification_report(y_test, best_model['predictions'], target_names=target_names))

# Confusion Matrix
cm = confusion_matrix(y_test, best_model['predictions'])
plt.figure(figsize=(10, 8))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
            xticklabels=target_names, yticklabels=target_names)
plt.title(f'Confusion Matrix - {best_model_name}', fontsize=16)
plt.xlabel('Predicted Species', fontsize=12)
plt.ylabel('Actual Species', fontsize=12)
plt.tight_layout()
plt.savefig('confusion_matrix.png', dpi=300, bbox_inches='tight')
print("✅ Confusion matrix saved as 'confusion_matrix.png'")

# Model comparison
plt.figure(figsize=(12, 8))
model_names = list(results.keys())
accuracies = [results[name]['accuracy'] for name in model_names]
precisions = [results[name]['precision'] for name in model_names]
recalls = [results[name]['recall'] for name in model_names]

x = np.arange(len(model_names))
width = 0.25

plt.bar(x - width, accuracies, width, label='Accuracy', alpha=0.8)
plt.bar(x, precisions, width, label='Precision', alpha=0.8)
plt.bar(x + width, recalls, width, label='Recall', alpha=0.8)

plt.xlabel('Models', fontsize=12)
plt.ylabel('Score', fontsize=12)
plt.title('Model Performance Comparison', fontsize=16)
plt.xticks(x, model_names, rotation=45)
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('model_comparison.png', dpi=300, bbox_inches='tight')
print("✅ Model comparison saved as 'model_comparison.png'")

# Feature importance (for Decision Tree)
if 'Decision Tree' in results:
    dt_model = results['Decision Tree']['model']
    feature_importance = dt_model.feature_importances_
    
    plt.figure(figsize=(10, 6))
    indices = np.argsort(feature_importance)[::-1]
    plt.bar(range(len(feature_importance)), feature_importance[indices])
    plt.title('Feature Importance - Decision Tree', fontsize=16)
    plt.xlabel('Features', fontsize=12)
    plt.ylabel('Importance', fontsize=12)
    plt.xticks(range(len(feature_importance)), [feature_names[i] for i in indices], rotation=45)
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('feature_importance.png', dpi=300, bbox_inches='tight')
    print("✅ Feature importance plot saved as 'feature_importance.png'")

# Sample predictions
print(f"\n🔮 Sample Predictions using {best_model_name}:")
print("-" * 50)
sample_indices = np.random.choice(len(X_test), 5, replace=False)
for i, idx in enumerate(sample_indices):
    actual = target_names[y_test[idx]]
    predicted = target_names[best_model['predictions'][idx]]
    features = X_test[idx]
    
    print(f"\nSample {i+1}:")
    print(f"  Features: {features}")
    print(f"  Actual: {actual}")
    print(f"  Predicted: {predicted}")
    print(f"  Correct: {'✅' if actual == predicted else '❌'}")

print(f"\n🎉 Analysis Complete!")
print(f"📁 Generated files:")
print("   - iris_pairplot.png")
print("   - iris_correlation.png") 
print("   - iris_distributions.png")
print("   - iris_boxplots.png")
print("   - confusion_matrix.png")
print("   - model_comparison.png")
print("   - feature_importance.png")
