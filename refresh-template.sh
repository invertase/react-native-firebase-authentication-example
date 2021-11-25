#!/bin/bash

# Preserve the Auth-specific stuff we've layered on the upstream template
mkdir -p SAVE/ios/ProjectName/

# Clean up old files
rm -rf luna-template.zip luna-master template

# Download and unpack the current luna template as a mobile+web+typescript base
curl -q --location https://github.com/plaut-ro/luna/archive/refs/heads/master.zip -o luna-template.zip
unzip -q luna-template.zip
mv luna-master/template .
rm -rf luna-template.zip luna-master

# Add our firebase configs

# This is just a speed optimization, very optional, but asks xcodebuild to use clang and clang++ without the fully-qualified path
# That means that you can then make a symlink in your path with clang or clang++ and have it use a different binary
# In that way you can install ccache or buildcache and get much faster compiles...
sed -i -e $'s/react_native_post_install(installer)/react_native_post_install(installer)\\\n    \\\n    installer.pods_project.targets.each do |target|\\\n      target.build_configurations.each do |config|\\\n        # Optionally use "relative" compiler paths. This allows use of ccache if it is in your PATH, which is a huge performance booth..\\\n        config.build_settings["CC"] = "clang"\\\n        config.build_settings["LD"] = "clang"\\\n        config.build_settings["CXX"] = "clang++"\\\n        config.build_settings["LDPLUSPLUS"] = "clang++"\\\n      end\\\n    end/' template/ios/Podfile
rm -f template/ios/Podfile??

# Also disable warnings on dependencies, they make the build log almost unreadable, to the point of being a performance problem.
sed -i -e $'s/react_native_post_install(installer)/react_native_post_install(installer)\\\n    \\\n    installer.pods_project.targets.each do |target|\\\n      target.build_configurations.each do |config|\\\n        # Optionally disable build warnings in dependencies. There are so many typically, it is a performance problem.\\\n        config.build_settings["GCC_WARN_INHIBIT_ALL_WARNINGS"] = "YES"\\\n      end\\\n    end/' template/ios/Podfile
rm -f template/ios/Podfile??

