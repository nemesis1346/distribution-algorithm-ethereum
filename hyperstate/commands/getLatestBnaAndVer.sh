# Get the bna file names
bnaFiles=()
versionNum=()
# Get all bna files from the hyperstate directory
for i in *.bna; do
    bnaFiles+=($i)
done

# get and store all version names from bna files
for i in "${bnaFiles[@]}"
    do
    # This regex gets version number x.x.x.
    temp1=$(echo $i | sed 's/[^0-9.]*\([0-9.]*\).*/\1/')
    # This regex removes the dot at the end leaving x.x.x
    vnum=$(echo $temp1 | sed 's/\.$//')
    versionNum+=($vnum)
done

# Could use ls -d -- *.bna |cut -c 12-16 instead, 
# not ideal given the flexiblit in naming *.bna files. 
# but assumes bna files are formatted as
# hyperstate@x.x.x.bna

# Determine which version number is bigger, see https://stackoverflow.com/questions/16989598/bash-comparing-version-numbers
function version_gt() { test "$(printf '%s\n' "$@" | sort -V | head -n 1)" != "$1"; }

# Get the number of .bnaFiles
bnaFilesLen=${#bnaFiles[@]}
highestVer=${versionNum[0]}
maxIndex=0 #Find the index with the highest version number

# Find the biggest version number in for the list of bnaFiles.
if [ "$bnaFilesLen" -gt "1" ]; then
for (( i=1; i<=bnaFilesLen; i++))
    do
    # temp variable for comparing version numbers
    tempVersion=${versionNum[$i]}
    # check which file is bigger
    if version_gt $tempVersion $highestVer; then
        #printf "$first_version2 is greater than $ tempVersion !\n"
        maxIndex=$i
        highestVer=$tempVersion
    fi
done
fi

hyperstateVer=${versionNum[$maxIndex]}
hyperstateBNA=${bnaFiles[$maxIndex]}

# Implementation of incrementing version numbers
# https://stackoverflow.com/questions/8653126/how-to-increment-version-number-in-a-shell-script
increment_version ()
{
  declare -a part=( ${1//\./ } )
  declare    new
  declare -i carry=1

  for (( CNTR=${#part[@]}-1; CNTR>=0; CNTR-=1 )); do
    len=${#part[CNTR]}
    new=$((part[CNTR]+carry))
    [ ${#new} -gt $len ] && carry=1 || carry=0
    [ $CNTR -gt 0 ] && part[CNTR]=${new: -len} || part[CNTR]=${new}
  done
  new="${part[*]}"
  echo -e "${new// /.}"
} 

hyperstateNewVer=$(increment_version $hyperstateVer)
#echo "$hyperstateNewVer"

# Using Bash parameter expansion
# https://stackoverflow.com/questions/2871181/replacing-some-characters-in-a-string-with-another-character

# find the next hyperstate bna file using, old file names and new version number.
# using bash parameter expansion.
hyperstateNewBNA=${hyperstateBNA/$hyperstateVer*./$hyperstateNewVer.}

#echo "$hyperstateNewBNA"
# Latest previous versions 
export hyperstateVer
export hyperstateBNA
# new versions
export hyperstateNewVer
export hyperstateNewBNA
