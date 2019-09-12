class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.integer :id_im

      t.timestamps
    end
  end
end
