import setuptools


with open("README.md") as fp:
    long_description = fp.read()


setuptools.setup(
    name="ivs_moderation",
    version="0.0.5",

    description="A prototype to moderate IVS streams using Rekognition.",
    long_description=long_description,
    long_description_content_type="text/markdown",

    author="Subin Hutton: subinh@amazon.com",

    package_dir={"": "ivs_moderation"},
    packages=setuptools.find_packages(where="ivs_moderation"),

    install_requires=[
        "aws-cdk.core>=1.111.0",
    ],

    python_requires=">=3.6",

    classifiers=[
        "Development Status :: 4 - Beta",

        "Intended Audience :: Developers",

        "License :: OSI Approved :: Apache Software License",

        "Programming Language :: JavaScript",
        "Programming Language :: Python :: 3 :: Only",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",

        "Topic :: Software Development :: Code Generators",
        "Topic :: Utilities",

        "Typing :: Typed",
    ],
)
