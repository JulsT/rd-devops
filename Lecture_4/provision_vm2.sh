File.open("provision_vm2.sh", "w") do |f|
  f.write(<<-SCRIPT
#!/bin/bash
sudo apt-get update
sudo apt-get install -y net-tools
SCRIPT
  )
end