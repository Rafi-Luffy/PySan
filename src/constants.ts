// src/constants.ts
export const PACKAGE_PROFILES: { [key: string]: string[] } = {
    core: ['pip', 'setuptools', 'wheel', 'virtualenv', 'conda', 'pipenv', 'python-dateutil', 'six', 'packaging', 'attrs', 'pytz', 'certifi', 'charset-normalizer', 'idna', 'urllib3'],
    data_science: ['pandas', 'numpy', 'scikit-learn', 'matplotlib', 'seaborn', 'plotly', 'bokeh', 'statsmodels', 'scipy', 'ipython', 'jupyter', 'jupyterlab', 'notebook', 'xlrd', 'openpyxl', 'altair', 'ipywidgets'],
    machine_learning: ['tensorflow', 'keras', 'torch', 'pytorch', 'transformers', 'opencv-python', 'xgboost', 'lightgbm', 'catboost', 'gensim', 'nltk', 'spacy', 'imbalanced-learn', 'huggingface-hub', 'accelerate', 'datasets', 'scikit-image', 'pillow'],
    web_dev_backend: ['flask', 'django', 'fastapi', 'requests', 'sqlalchemy', 'aiohttp', 'uvicorn', 'gunicorn', 'httpx', 'celery', 'redis', 'werkzeug', 'jinja2', 'itsdangerous', 'pyjwt', 'bcrypt', 'alembic', 'greenlet', 'pydantic'],
    web_dev_frontend: ['whitenoise', 'django-compressor', 'python-livereload', 'jsonschema', 'watchdog'],
    automation_scripting: ['requests', 'beautifulsoup4', 'scrapy', 'selenium', 'pyautogui', 'click', 'typer', 'pyyaml', 'tqdm', 'watchdog', 'psutil', 'openpyxl'],
    data_engineering: ['pyspark', 'dask', 'airflow', 'pandas', 'numpy', 'sqlalchemy', 'boto3', 's3fs', 'pyarrow', 'kafka-python'],
    devops_cloud: ['boto3', 'botocore', 'ansible', 'docker', 'fabric', 'aws-cli', 'azure-cli', 'google-cloud-sdk', 'terraform'],
    desktop_gui: ['pyqt5', 'pyqt6', 'pyside2', 'pyside6', 'tkinter', 'kivy', 'wxpython', 'customtkinter', 'pyglet'],
    testing: ['pytest', 'unittest', 'mock', 'coverage', 'tox', 'nose', 'selenium', 'behave', 'playwright'],
    scientific_computing: ['numpy', 'scipy', 'sympy', 'numba', 'cython', 'h5py', 'netcdf4', 'xarray'],
    game_dev: ['pygame', 'pyglet', 'arcade', 'ursina']
};

export const PYTHON_SCRIPT_TEXT = `import os
import sys
import json
import tkinter as tk
from tkinter import filedialog

# Compatibility with older Python versions
try:
    from importlib.metadata import distributions, PackageNotFoundError
except ImportError:
    from importlib_metadata import distributions, PackageNotFoundError

def get_package_size(dist):
    """Calculate the total size of all files in a distribution."""
    total_size = 0
    if not dist.files:
        try:
            dist_path = dist.locate_file('')
            if dist_path.is_dir():
                for path, _, filenames in os.walk(dist_path):
                    for f in filenames:
                        try:
                            total_size += os.path.getsize(os.path.join(path, f))
                        except OSError:
                            continue
                return total_size
            elif dist_path.is_file():
                return dist_path.stat().st_size
        except (OSError, PackageNotFoundError):
            return 0
        return 0

    for file in dist.files:
        try:
            absolute_path = dist.locate_file(file)
            total_size += absolute_path.stat().st_size
        except (FileNotFoundError, OSError):
            continue
    return total_size

def main():
    root = tk.Tk()
    root.withdraw()

    filepath = filedialog.asksaveasfilename(
        title="Save Python Package Data",
        initialfile="pysan_packages.json",
        defaultextension=".json",
        filetypes=[("JSON files", "*.json"), ("All files", "*.*")]
    )

    if not filepath:
        sys.stderr.write("Operation cancelled. No file saved.\\n")
        return

    all_dists = list(distributions())
    package_details = []

    sys.stderr.write(f"📦 Analyzing {len(all_dists)} packages...\\n")

    for i, dist in enumerate(all_dists):
        name = dist.metadata.get("Name", "unknown")
        progress = (i + 1) / len(all_dists) * 100
        sys.stderr.write(f"\\r[{'=' * int(progress // 4):<25}] {progress:.1f}% - {name}")
        
        package_details.append({
            "name": name,
            "version": dist.metadata.get("Version", "unknown"),
            "size": get_package_size(dist)
        })

    sys.stderr.write("\\n✅ Analysis complete.\\n")
    
    with open(filepath, 'w') as f:
        json.dump(package_details, f, indent=2)
    
    sys.stderr.write(f"Data successfully saved to: {filepath}\\n")

if __name__ == "__main__":
    main()
`;

export const PYTHON_SCRIPT_HTML = `<span class="kw">import</span> os
<span class="kw">import</span> sys
<span class="kw">import</span> json
<span class="kw">import</span> tkinter <span class="kw">as</span> tk
<span class="kw">from</span> tkinter <span class="kw">import</span> filedialog

<span class="comment"># Compatibility with older Python versions</span>
<span class="kw">try</span>:
    <span class="kw">from</span> importlib.metadata <span class="kw">import</span> distributions, PackageNotFoundError
<span class="kw">except</span> ImportError:
    <span class="kw">from</span> importlib_metadata <span class="kw">import</span> distributions, PackageNotFoundError

<span class="kw">def</span> <span class="func">get_package_size</span>(dist):
    <span class="str">"""Calculate the total size of all files in a distribution."""</span>
    total_size = <span class="num">0</span>
    <span class="kw">if not</span> dist.files:
        <span class="kw">try</span>:
            dist_path = dist.locate_file(<span class="str">''</span>)
            <span class="kw">if</span> dist_path.is_dir():
                <span class="kw">for</span> path, _, filenames <span class="kw">in</span> os.walk(dist_path):
                    <span class="kw">for</span> f <span class="kw">in</span> filenames:
                        <span class="kw">try</span>:
                            total_size += os.path.getsize(os.path.join(path, f))
                        <span class="kw">except</span> OSError:
                            <span class="kw">continue</span>
                <span class="kw">return</span> total_size
            <span class="kw">elif</span> dist_path.is_file():
                <span class="kw">return</span> dist_path.stat().st_size
        <span class="kw">except</span> (OSError, PackageNotFoundError):
            <span class="kw">return</span> <span class="num">0</span>
        <span class="kw">return</span> <span class="num">0</span>

    <span class="kw">for</span> file <span class="kw">in</span> dist.files:
        <span class="kw">try</span>:
            absolute_path = dist.locate_file(file)
            total_size += absolute_path.stat().st_size
        <span class="kw">except</span> (FileNotFoundError, OSError):
            <span class="kw">continue</span>
    <span class="kw">return</span> total_size

<span class="kw">def</span> <span class="func">main</span>():
    root = tk.Tk()
    root.withdraw()

    filepath = filedialog.asksaveasfilename(
        title=<span class="str">"Save Python Package Data"</span>,
        initialfile=<span class="str">"pysan_packages.json"</span>,
        defaultextension=<span class="str">".json"</span>,
        filetypes=[(<span class="str">"JSON files"</span>, <span class="str">"*.json"</span>), (<span class="str">"All files"</span>, <span class="str">"*.*"</span>)]
    )

    <span class="kw">if not</span> filepath:
        sys.stderr.write(<span class="str">"Operation cancelled. No file saved.\\n"</span>)
        <span class="kw">return</span>

    all_dists = list(distributions())
    package_details = []

    sys.stderr.write(<span class="str">f"📦 Analyzing {len(all_dists)} packages...\\n"</span>)

    <span class="kw">for</span> i, dist <span class="kw">in</span> enumerate(all_dists):
        name = dist.metadata.get(<span class="str">"Name"</span>, <span class="str">"unknown"</span>)
        progress = (i + <span class="num">1</span>) / len(all_dists) * <span class="num">100</span>
        sys.stderr.write(<span class="str">f"\\r[{'=' * int(progress // 4):<25}] {progress:.1f}% - {name}"</span>)
        
        package_details.append({
            <span class="str">"name"</span>: name,
            <span class="str">"version"</span>: dist.metadata.get(<span class="str">"Version"</span>, <span class="str">"unknown"</span>),
            <span class="str">"size"</span>: get_package_size(dist)
        })

    sys.stderr.write(<span class="str">"\\n✅ Analysis complete.\\n"</span>)
    
    <span class="kw">with</span> open(filepath, <span class="str">'w'</span>) <span class="kw">as</span> f:
        json.dump(package_details, f, indent=<span class="num">2</span>)
    
    sys.stderr.write(<span class="str">f"Data successfully saved to: {filepath}\\n"</span>)

<span class="kw">if</span> __name__ == <span class="str">"__main__"</span>:
    main()`;