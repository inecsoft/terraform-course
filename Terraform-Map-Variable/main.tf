
# range(max)
# range(start, limit)
# range(start, limit, step)

variable "name_counts" {
  type    = map(number)
  default = {
    "foo" = 2
    "bar" = 4
  }
}

locals {
  expanded_names = {
    for name, count in var.name_counts : name => [
      for i in range(count) : format("%s%03d", name, i)
    ]
  }
}

output "expanded_names" {
  value = local.expanded_names
}

#convert list to map with index
locals {
  characters_name = ["luke", "yoda", "darth"]
  enemies_destroyed_count = [4252, 900, 20000056894]

  map_index = {
    for index, character in toset(local.characters_name) :
      character => local.enemies_destroyed_count[index(local.characters_name, index)]
  }
}

output "convert_list_to_map_index" {
  value = local.map_index
}

#convert list to map

locals {
  characters = ["luke", "yoda", "darth"]
  enemies_destroyed = [4252, 900, 20000056894]

  map = {
    for character in toset(local.characters) : # Convert character list to a set
      character => local.enemies_destroyed
  }
}

output "convert_list_to_map" {
  value = local.map
}

#flatten function with a map
locals {
  enemies_map= {
    luke  = 4252
    yoda  = 900
    darth = 20000056894
  }

  flattened_enemies_map = flatten([
    for key, value in local.enemies_map:
    [key, value]
  ])
}

#echo local.flattened_enemies_map | terraform console

output "flatten_function_with_a_map" {
  value = local.tomap
}

# map and tomap functions
locals {
  enemies_list = [
    { name = "luke",  enemies_destroyed = 4252 },
    { name = "yoda", enemies_destroyed = 900},
    { name = "darth", enemies_destroyed = 20000056894},
  ]

  tomap = tomap({
    for character in local.enemies_list:
    character.name => character.enemies_destroyed
  })
}
# echo local.tomap | terraform console

output "map_and_tomap_functions" {
  value = local.tomap
}